"""Analytics data aggregation function."""
import functions_framework
from google.cloud import firestore
from ...common.auth import verify_token
from ...common.error_handling import handle_errors
from datetime import datetime, timedelta

db = firestore.Client()

@functions_framework.http
@handle_errors
def get_analytics_data(request):
    """Get analytics data for an artisan."""
    user = verify_token(request)
    artisan_id = user['uid']
    
    # Get date range (last 30 days)
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    
    # Get orders
    orders_ref = db.collection('orders')
    orders = orders_ref.where('artisanId', '==', artisan_id)\
        .where('createdAt', '>=', start_date)\
        .stream()
    
    # Aggregate sales data
    total_sales = 0
    sales_by_date = {}
    for order in orders:
        data = order.to_dict()
        sale_date = data['createdAt'].date().isoformat()
        amount = data.get('totalAmount', 0)
        total_sales += amount
        sales_by_date[sale_date] = sales_by_date.get(sale_date, 0) + amount
    
    # Get products
    products_ref = db.collection('products')
    products = products_ref.where('artisanId', '==', artisan_id).stream()
    
    # Aggregate product data
    total_views = 0
    products_data = []
    for product in products:
        data = product.to_dict()
        views = data.get('views', 0)
        total_views += views
        products_data.append({
            'id': product.id,
            'name': data.get('name', ''),
            'views': views,
            'sales': data.get('totalSales', 0)
        })
    
    # Sort products by views
    top_products = sorted(products_data, key=lambda x: x['views'], reverse=True)[:5]
    
    return {
        "success": True,
        "total_sales": total_sales,
        "total_views": total_views,
        "sales_by_date": sales_by_date,
        "top_products": top_products
    }