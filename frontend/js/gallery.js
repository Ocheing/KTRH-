// Media Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const categoryBtns = document.querySelectorAll('.category-btn');
    const mediaSearch = document.getElementById('mediaSearch');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const viewBtns = document.querySelectorAll('.view-btn');
    const shareBtns = document.querySelectorAll('.share-btn');
    const playBtns = document.querySelectorAll('.play-btn');
    const loadMoreBtn = document.getElementById('loadMore');
    const imageModal = document.getElementById('imageModal');
    const videoModal = document.getElementById('videoModal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDate = document.getElementById('modalDate');
    const modalCategory = document.getElementById('modalCategory');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const videoFrame = document.getElementById('videoFrame');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    
    // Sample media data for modal
    const mediaData = [
        {
            id: 1,
            title: "Medical Camp 2024",
            description: "Our annual free medical camp served over 500 community members with various health screenings, consultations, and free medications. The event was organized in partnership with local health organizations.",
            date: "March 15, 2024",
            category: "Events",
            image: "https://images.unsplash.com/photo-1516549655669-df6654e435de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        },
        {
            id: 2,
            title: "New ICU Unit",
            description: "Our new state-of-the-art Intensive Care Unit features 20 beds with advanced monitoring systems, dedicated isolation rooms, and round-the-clock critical care specialists.",
            date: "February 28, 2024",
            category: "Facilities",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        },
        {
            id: 3,
            title: "Staff Training",
            description: "Advanced cardiac life support training for our medical staff conducted by certified instructors. The training focused on emergency response protocols and team coordination.",
            date: "January 20, 2024",
            category: "Team Activities",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        },
        {
            id: 4,
            title: "Quality Award 2023",
            description: "Received 'Best Teaching Hospital Award' from the Ministry of Health for excellence in medical education, patient care, and innovative healthcare practices.",
            date: "December 15, 2023",
            category: "Achievements",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        },
        {
            id: 5,
            title: "Health Awareness Campaign",
            description: "Diabetes awareness campaign conducted in local community, reaching over 1000 residents with free screenings, education materials, and lifestyle counseling.",
            date: "November 10, 2023",
            category: "Community",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        },
        {
            id: 6,
            title: "Hospital Tour Video",
            description: "Virtual tour of our modern hospital facilities including wards, operation theaters, diagnostic center, and rehabilitation units.",
            date: "October 5, 2023",
            category: "Videos",
            videoId: "dQw4w9WgXcQ" // Sample YouTube video ID
        }
    ];
    
    let currentMediaIndex = 0;
    
    // Category Filter Functionality
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Search Functionality
    mediaSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        galleryItems.forEach(item => {
            const title = item.getAttribute('data-title').toLowerCase();
            const category = Array.from(item.classList)
                .find(cls => cls !== 'gallery-item') || '';
            
            const matches = title.includes(searchTerm) || 
                           category.includes(searchTerm);
            
            if (matches) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // View Image Modal
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mediaId = parseInt(this.getAttribute('data-id'));
            const mediaItem = mediaData.find(item => item.id === mediaId);
            
            if (mediaItem) {
                if (mediaItem.videoId) {
                    // It's a video
                    showVideoModal(mediaItem);
                } else {
                    // It's an image
                    showImageModal(mediaItem);
                }
            }
        });
    });
    
    // Play buttons for video items
    playBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.video-card');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            
            showVideoModal({
                title: title,
                description: description,
                videoId: "dQw4w9WgXcQ" // Sample video ID
            });
        });
    });
    
    function showImageModal(media) {
        modalImage.src = media.image;
        modalImage.alt = media.title;
        modalTitle.textContent = media.title;
        modalDescription.textContent = media.description;
        modalDate.textContent = media.date;
        modalCategory.textContent = media.category;
        
        // Set current index
        currentMediaIndex = mediaData.findIndex(item => item.id === media.id);
        updateNavigationButtons();
        
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function showVideoModal(media) {
        videoTitle.textContent = media.title;
        videoDescription.textContent = media.description;
        videoFrame.src = `https://www.youtube.com/embed/${media.videoId}?autoplay=1`;
        
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Share Functionality
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mediaId = parseInt(this.getAttribute('data-id'));
            const mediaItem = mediaData.find(item => item.id === mediaId);
            
            if (mediaItem && navigator.share) {
                navigator.share({
                    title: mediaItem.title,
                    text: mediaItem.description,
                    url: window.location.href,
                })
                .catch(console.error);
            } else {
                // Fallback for browsers that don't support Web Share API
                const shareUrl = window.location.href;
                const shareText = `${mediaItem.title}: ${mediaItem.description}`;
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                
                // Show share options
                alert(`Share "${mediaItem.title}"\n\nTwitter: ${twitterUrl}\nFacebook: ${facebookUrl}`);
            }
        });
    });
    
    // Modal Navigation
    prevBtn.addEventListener('click', function() {
        if (currentMediaIndex > 0) {
            currentMediaIndex--;
            const media = mediaData[currentMediaIndex];
            if (media && !media.videoId) {
                showImageModal(media);
            }
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentMediaIndex < mediaData.length - 1) {
            currentMediaIndex++;
            const media = mediaData[currentMediaIndex];
            if (media && !media.videoId) {
                showImageModal(media);
            }
        }
    });
    
    function updateNavigationButtons() {
        prevBtn.disabled = currentMediaIndex === 0;
        nextBtn.disabled = currentMediaIndex === mediaData.length - 1;
    }
    
    // Close Modals
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    // Close modals when clicking outside
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeModals();
        }
    });
    
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeModals();
        }
    });
    
    function closeModals() {
        imageModal.style.display = 'none';
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Stop video playback
        videoFrame.src = '';
    }
    
    // Load More Functionality
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more items
        const spinner = document.createElement('div');
        spinner.className = 'loader';
        spinner.style.margin = '20px auto';
        this.parentElement.appendChild(spinner);
        
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate API call delay
        setTimeout(() => {
            spinner.remove();
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-plus"></i> Load More Media';
            
            // Show message (in real app, you would append new items)
            alert('More media items would load here. This is a demo.');
        }, 1500);
    });
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize
    updateNavigationButtons();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
 
});