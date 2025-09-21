import React, { useState, useEffect } from 'react';

const ArtistCollaborationPage = () => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: '',
    artStyle: '',
    skills: [],
    location: '',
    lookingFor: '',
    bio: ''
  });
  const [showProfileSetup, setShowProfileSetup] = useState(true);

  // Mock artist profiles
  const mockProfiles = [
    {
      id: 1,
      name: "Maria Rodriguez",
      artStyle: "Contemporary Pottery",
      skills: ["Ceramics", "Glazing", "Sculpture"],
      location: "Santa Fe, NM",
      lookingFor: "Jewelry artist for ceramic-metal fusion pieces",
      bio: "15 years experience in ceramics. Love experimenting with textures and colors. Looking to create unique wearable art.",
      image: "🧑‍🎨",
      compatibility: 95,
      mutualSkills: ["Craftsmanship", "Color Theory"]
    },
    {
      id: 2,
      name: "David Chen",
      artStyle: "Digital Art & Photography",
      skills: ["Photography", "Digital Design", "Photo Editing"],
      location: "Portland, OR",
      lookingFor: "Traditional artists for digital-physical art collaborations",
      bio: "Photographer and digital artist specializing in nature and urban landscapes. Interested in combining digital with traditional mediums.",
      image: "📸",
      compatibility: 87,
      mutualSkills: ["Visual Composition", "Storytelling"]
    },
    {
      id: 3,
      name: "Priya Sharma",
      artStyle: "Textile Arts",
      skills: ["Weaving", "Natural Dyeing", "Pattern Design"],
      location: "Austin, TX",
      lookingFor: "Wood carvers or metalworkers for mixed-media installations",
      bio: "Traditional weaver working with organic materials. Passionate about sustainable art and cultural fusion projects.",
      image: "🧵",
      compatibility: 92,
      mutualSkills: ["Traditional Techniques", "Cultural Art"]
    },
    {
      id: 4,
      name: "James Wilson",
      artStyle: "Wood Carving & Sculpture",
      skills: ["Wood Carving", "Furniture Making", "Tool Crafting"],
      location: "Asheville, NC",
      lookingFor: "Textile artists for furniture upholstery collaborations",
      bio: "Master carpenter and wood sculptor. Specialize in functional art pieces and custom furniture with artistic flair.",
      image: "🪵",
      compatibility: 89,
      mutualSkills: ["Handcrafting", "Functional Art"]
    },
    {
      id: 5,
      name: "Elena Popović",
      artStyle: "Metal Arts & Jewelry",
      skills: ["Metalsmithing", "Jewelry Design", "Welding"],
      location: "Seattle, WA",
      lookingFor: "Stone carvers or glass artists for jewelry collaborations",
      bio: "Contemporary jewelry artist working with recycled metals. Love creating statement pieces that tell environmental stories.",
      image: "💍",
      compatibility: 84,
      mutualSkills: ["Precision Work", "Design Thinking"]
    }
  ];

  const artStyles = [
    'Traditional', 'Contemporary', 'Abstract', 'Realistic', 'Folk Art',
    'Minimalist', 'Vintage', 'Bohemian', 'Modern', 'Rustic'
  ];

  const skillOptions = [
    'Painting', 'Drawing', 'Ceramics', 'Sculpture', 'Photography',
    'Jewelry Making', 'Textiles', 'Wood Working', 'Metal Working',
    'Glass Art', 'Digital Art', 'Printmaking', 'Calligraphy',
    'Embroidery', 'Weaving', 'Pottery', 'Carving', 'Mosaic'
  ];

  useEffect(() => {
    if (!showProfileSetup && mockProfiles.length > 0) {
      setCurrentProfile(mockProfiles[0]);
    }
  }, [showProfileSetup]);

  const handleProfileSubmit = () => {
    if (userProfile.name && userProfile.artStyle && userProfile.skills.length > 0) {
      setShowProfileSetup(false);
    }
  };

  const handleSkillToggle = (skill) => {
    setUserProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSwipe = (action) => {
    if (!currentProfile) return;

    if (action === 'like') {
      setMatches(prev => [...prev, currentProfile]);
    }

    // Move to next profile
    const currentIndex = mockProfiles.findIndex(p => p.id === currentProfile.id);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < mockProfiles.length) {
      setCurrentProfile(mockProfiles[nextIndex]);
    } else {
      setCurrentProfile(null); // No more profiles
    }
  };

  const resetProfiles = () => {
    setCurrentProfile(mockProfiles[0]);
    setMatches([]);
  };

  if (showProfileSetup) {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h2 style={{ color: '#e91e63', marginBottom: '10px' }}>🤝 Artist Collaboration</h2>
          <p style={{ color: '#666' }}>Find your perfect artistic partner for fusion projects</p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #ddd' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)', marginBottom: '25px' }}>Create Your Artist Profile</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Your Name
            </label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Art Style
            </label>
            <select
              value={userProfile.artStyle}
              onChange={(e) => setUserProfile(prev => ({ ...prev, artStyle: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              <option value="">Select your primary art style...</option>
              {artStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Your Skills (Select multiple)
            </label>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {skillOptions.map(skill => (
                  <label key={skill} style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '5px'
                  }}>
                    <input
                      type="checkbox"
                      checked={userProfile.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '13px' }}>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Selected: {userProfile.skills.length} skills
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Location
            </label>
            <input
              type="text"
              value={userProfile.location}
              onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
              placeholder="City, State/Country"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              What type of collaboration are you looking for?
            </label>
            <textarea
              value={userProfile.lookingFor}
              onChange={(e) => setUserProfile(prev => ({ ...prev, lookingFor: e.target.value }))}
              placeholder="e.g., Looking for a metalworker to create jewelry pieces with my ceramic beads"
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Bio
            </label>
            <textarea
              value={userProfile.bio}
              onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell other artists about yourself, your experience, and your artistic vision..."
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            onClick={handleProfileSubmit}
            disabled={!userProfile.name || !userProfile.artStyle || userProfile.skills.length === 0}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: (!userProfile.name || !userProfile.artStyle || userProfile.skills.length === 0) ? '#ccc' : '#e91e63',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: (!userProfile.name || !userProfile.artStyle || userProfile.skills.length === 0) ? 'not-allowed' : 'pointer'
            }}
          >
            🚀 Start Finding Collaborators
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ color: '#e91e63', marginBottom: '10px' }}>🤝 Artist Collaboration</h2>
        <p style={{ color: '#666' }}>Swipe to find artists for your next fusion project</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr 300px', gap: '30px' }}>
        {/* Artist Card */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {currentProfile ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              border: '1px solid #ddd',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              width: '100%',
              maxWidth: '350px'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '20px' }}>
                {currentProfile.image}
              </div>
              
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '24px' }}>
                {currentProfile.name}
              </h3>
              
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '8px 15px',
                borderRadius: '20px',
                marginBottom: '15px',
                fontSize: '14px',
                color: '#666'
              }}>
                {currentProfile.artStyle}
              </div>

              <div style={{
                backgroundColor: '#e8f5e9',
                padding: '10px 15px',
                borderRadius: '8px',
                marginBottom: '15px'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4caf50' }}>
                  {currentProfile.compatibility}% Match
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Mutual skills: {currentProfile.mutualSkills.join(', ')}
                </div>
              </div>

              <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Skills:</strong>
                <div style={{ marginTop: '5px' }}>
                  {currentProfile.skills.map(skill => (
                    <span key={skill} style={{
                      display: 'inline-block',
                      backgroundColor: '#e91e63',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      marginRight: '5px',
                      marginBottom: '5px'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Location:</strong>
                <div style={{ color: '#666', fontSize: '14px' }}>{currentProfile.location}</div>
              </div>

              <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Looking for:</strong>
                <div style={{ color: '#666', fontSize: '14px' }}>{currentProfile.lookingFor}</div>
              </div>

              <div style={{ marginBottom: '25px', textAlign: 'left' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Bio:</strong>
                <div style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>{currentProfile.bio}</div>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button
                  onClick={() => handleSwipe('pass')}
                  style={{
                    padding: '15px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    fontSize: '24px',
                    cursor: 'pointer',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ❌
                </button>
                <button
                  onClick={() => handleSwipe('like')}
                  style={{
                    padding: '15px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    fontSize: '24px',
                    cursor: 'pointer',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  💖
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              border: '2px dashed #ddd',
              padding: '60px 30px',
              textAlign: 'center',
              width: '100%',
              maxWidth: '350px'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>No more artists!</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                You've seen all available artists. Check your matches or come back later for more.
              </p>
              <button
                onClick={resetProfiles}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#e91e63',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🔄 See Profiles Again
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #ddd', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)', marginBottom: '20px' }}>💡 How It Works</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#e91e63',
                color: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <div>
                <strong>Browse Artists:</strong> See artists looking for collaborations
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#e91e63',
                color: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <div>
                <strong>Swipe:</strong> ❌ to pass, 💖 to express interest
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{
                backgroundColor: '#e91e63',
                color: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <div>
                <strong>Match:</strong> When both artists are interested, it's a match!
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                backgroundColor: '#e91e63',
                color: 'white',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                4
              </div>
              <div>
                <strong>Collaborate:</strong> Start planning your fusion project together
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#f0f8f0',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #4caf50'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#4caf50' }}>💡 Collaboration Tips</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--text-primary)' }}>
              <li>Be clear about your project goals</li>
              <li>Discuss time commitments upfront</li>
              <li>Share costs and profits fairly</li>
              <li>Document your collaboration agreement</li>
              <li>Respect each other's artistic styles</li>
            </ul>
          </div>
        </div>

        {/* Matches Sidebar */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #ddd', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)', marginBottom: '20px' }}>
            💖 Your Matches ({matches.length})
          </h3>
          
          {matches.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', padding: '20px 0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💫</div>
              <p>No matches yet. Keep swiping!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {matches.map(match => (
                <div key={match.id} style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ fontSize: '2rem', marginRight: '10px' }}>{match.image}</div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{match.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{match.artStyle}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                    {match.lookingFor}
                  </div>
                  <button style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#e91e63',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    💬 Start Conversation
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistCollaborationPage;