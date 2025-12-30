// Projects Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectsSearch = document.getElementById('projectsSearch');
    const projectCards = document.querySelectorAll('.project-card');
    const detailsBtns = document.querySelectorAll('.details-btn');
    const otherActionBtns = document.querySelectorAll('.action-btn:not(.details-btn)');
    const loadMoreBtn = document.getElementById('loadMore');
    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const chatWidget = document.getElementById('chatWidget');
    const chatCloseBtn = document.getElementById('chatClose');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Project Data for Modal
    const projectData = {
        1: {
            id: 1,
            title: "Cardiac Center Expansion",
            status: "ongoing",
            progress: 75,
            description: "Construction of a new 5-story cardiac center that will serve as a regional hub for cardiac care. The facility will feature state-of-the-art catheterization labs, cardiac ICU, rehabilitation center, and research facilities.",
            category: "Infrastructure",
            timeline: {
                start: "January 2024",
                end: "December 2024",
                phases: [
                    { date: "Jan-Mar 2024", event: "Site preparation and foundation" },
                    { date: "Apr-Jun 2024", event: "Structural construction" },
                    { date: "Jul-Sep 2024", event: "Interior work and installations" },
                    { date: "Oct-Dec 2024", event: "Equipment installation and commissioning" }
                ]
            },
            budget: {
                total: "KES 850,000,000",
                spent: "KES 637,500,000",
                source: "Ministry of Health (60%), County Government (30%), Donor Funding (10%)"
            },
            team: {
                contractor: "BuildRight Constructions Ltd",
                projectManager: "Eng. Sarah Kimani",
                medicalDirector: "Dr. Michael Otieno",
                teamSize: "150+ workers"
            },
            impact: {
                capacity: "50-bed facility with 5 cath labs",
                serviceArea: "Western Kenya region (5 million people)",
                jobCreation: "200+ permanent jobs after completion",
                training: "Cardiology fellowship program"
            },
            milestones: [
                "Foundation work completed (March 2024)",
                "Structural steel work 80% complete",
                "Medical equipment ordered",
                "Staff recruitment initiated"
            ],
            gallery: ["img1.jpg", "img2.jpg", "img3.jpg"]
        },
        2: {
            id: 2,
            title: "Diagnostic Imaging Center",
            status: "completed",
            description: "Modern diagnostic imaging center featuring 3T MRI, 128-slice CT scan, digital X-ray, and ultrasound systems. The center has significantly reduced waiting times and improved diagnostic accuracy.",
            category: "Infrastructure",
            completionDate: "December 15, 2023",
            investment: "KES 450,000,000",
            partner: "GE Healthcare",
            features: [
                "3T MRI with advanced neuro sequences",
                "128-slice CT scanner with cardiac imaging",
                "Digital X-ray with PACS integration",
                "High-resolution ultrasound systems",
                "Teleradiology capabilities"
            ],
            achievements: [
                "70% reduction in scan waiting times",
                "100+ patients served daily",
                "Regional referral center status achieved",
                "ISO 9001:2015 certification",
                "24/7 emergency imaging services"
            ],
            statistics: {
                patientsServed: "25,000+ since opening",
                scanAccuracy: "98.5% diagnostic accuracy",
                waitTime: "Average 24 hours (from 5 days)",
                satisfaction: "94% patient satisfaction"
            },
            team: {
                leadRadiologist: "Dr. Lucy Wanjiku",
                technicians: "15 certified technicians",
                supportStaff: "10 administrative staff"
            }
        },
        3: {
            id: 3,
            title: "Cancer Research & Treatment Center",
            status: "ongoing",
            progress: 60,
            description: "Comprehensive cancer research program focusing on cancers prevalent in the region. The program includes clinical trials, community screening, and multidisciplinary treatment approaches.",
            category: "Research",
            timeline: {
                start: "January 2023",
                end: "December 2025",
                phases: [
                    { date: "2023", event: "Research lab setup and staff training" },
                    { date: "2024", event: "Community screening programs" },
                    { date: "2025", event: "Clinical trials and treatment protocols" }
                ]
            },
            funding: {
                total: "KES 320,000,000",
                sources: ["WHO Grant (40%)", "Research Council (30%)", "University Partnership (30%)"]
            },
            partners: ["World Health Organization", "Kisii University", "Kenya Medical Research Institute"],
            focusAreas: [
                "Breast cancer screening and treatment",
                "Cervical cancer prevention",
                "Prostate cancer research",
                "Palliative care development",
                "Community awareness programs"
            ],
            achievements: [
                "500+ patients screened in first year",
                "Research laboratory established",
                "Two clinical trials initiated",
                "Community health worker training completed",
                "Mobile screening unit operational"
            ],
            team: {
                principalInvestigator: "Dr. James Omondi",
                researchers: "8 research fellows",
                clinicians: "5 oncology specialists",
                communityWorkers: "20 trained volunteers"
            }
        },
        4: {
            id: 4,
            title: "Children's Hospital Wing",
            status: "upcoming",
            description: "Dedicated pediatric care facility designed to provide comprehensive healthcare for children in a child-friendly environment. The wing will feature specialized pediatric units and family support services.",
            category: "Infrastructure",
            timeline: {
                start: "Q3 2024",
                end: "Q4 2025",
                duration: "18 months"
            },
            budget: "KES 1,200,000,000",
            fundingStatus: "70% secured (Ministry of Health), 30% pending",
            capacity: "100 beds including 20 NICU and 15 PICU beds",
            features: [
                "Child-friendly interior design with play areas",
                "Family accommodation facilities",
                "Pediatric emergency department",
                "Child life specialists and play therapy",
                "School and education support",
                "Outdoor playground and garden"
            ],
            departments: [
                "Pediatric Cardiology",
                "Neonatal Intensive Care Unit",
                "Pediatric Oncology",
                "Child Psychiatry",
                "Adolescent Medicine",
                "Pediatric Surgery"
            ],
            impact: {
                serviceArea: "Western and Nyanza regions",
                targetPatients: "Children aged 0-18 years",
                expectedPatients: "15,000+ annually",
                jobCreation: "300+ healthcare jobs"
            },
            partners: ["Ministry of Health", "Children's Hospital Foundation", "UNICEF"]
        }
    };
    
    // Category Filter Functionality
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            projectCards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Search Functionality
    projectsSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        projectCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const category = Array.from(card.classList)
                .find(cls => cls !== 'project-card' && cls !== 'ongoing' && cls !== 'completed' && cls !== 'upcoming') || '';
            
            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) || 
                           category.includes(searchTerm);
            
            if (matches) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // Project Details Modal
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            
            if (projectData[projectId]) {
                showProjectModal(projectData[projectId]);
            }
        });
    });
    
    // Other Action Buttons
    otherActionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = parseInt(this.getAttribute('data-id'));
            const action = this.classList[1]; // Gets the second class (e.g., updates-btn, gallery-btn)
            
            handleProjectAction(projectId, action);
        });
    });
    
    function showProjectModal(project) {
        let modalHTML = `
            <div class="modal-header">
                <span class="modal-status ${project.status}">${project.status.toUpperCase()}</span>
                <h2>${project.title}</h2>
            </div>
            
            <p class="modal-description">${project.description}</p>
            
            <div class="modal-details-grid">
        `;
        
        // Status-specific content
        if (project.status === 'ongoing') {
            modalHTML += `
                <div class="modal-section">
                    <h3><i class="fas fa-chart-line"></i> Progress</h3>
                    <div class="progress-bar" style="margin: 15px 0;">
                        <div class="progress-fill" style="width: ${project.progress}%;"></div>
                        <span class="progress-text">${project.progress}% Complete</span>
                    </div>
                    <p><strong>Timeline:</strong> ${project.timeline.start} - ${project.timeline.end}</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-money-bill-wave"></i> Budget</h3>
                    <p><strong>Total Budget:</strong> ${project.budget.total}</p>
                    <p><strong>Amount Spent:</strong> ${project.budget.spent}</p>
                    <p><strong>Funding Sources:</strong> ${project.budget.source}</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-users"></i> Project Team</h3>
                    <ul>
                        <li><strong>Contractor:</strong> ${project.team.contractor}</li>
                        <li><strong>Project Manager:</strong> ${project.team.projectManager}</li>
                        <li><strong>Medical Director:</strong> ${project.team.medicalDirector}</li>
                        <li><strong>Team Size:</strong> ${project.team.teamSize}</li>
                    </ul>
                </div>
            `;
        } else if (project.status === 'completed') {
            modalHTML += `
                <div class="modal-section">
                    <h3><i class="fas fa-calendar-check"></i> Completion Details</h3>
                    <p><strong>Completed:</strong> ${project.completionDate}</p>
                    <p><strong>Investment:</strong> ${project.investment}</p>
                    <p><strong>Partner:</strong> ${project.partner}</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-trophy"></i> Achievements</h3>
                    <ul>
                        ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-chart-bar"></i> Statistics</h3>
                    <div class="stats-grid-modal">
                        <div class="stat-item-modal">
                            <h4>${project.statistics.patientsServed.split('+')[0]}+</h4>
                            <p>Patients Served</p>
                        </div>
                        <div class="stat-item-modal">
                            <h4>${project.statistics.scanAccuracy}</h4>
                            <p>Diagnostic Accuracy</p>
                        </div>
                        <div class="stat-item-modal">
                            <h4>${project.statistics.waitTime}</h4>
                            <p>Average Wait Time</p>
                        </div>
                        <div class="stat-item-modal">
                            <h4>${project.statistics.satisfaction}</h4>
                            <p>Patient Satisfaction</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (project.status === 'upcoming') {
            modalHTML += `
                <div class="modal-section">
                    <h3><i class="fas fa-calendar-alt"></i> Timeline</h3>
                    <p><strong>Start Date:</strong> ${project.timeline.start}</p>
                    <p><strong>End Date:</strong> ${project.timeline.end}</p>
                    <p><strong>Duration:</strong> ${project.timeline.duration}</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-money-bill-wave"></i> Funding</h3>
                    <p><strong>Total Budget:</strong> ${project.budget}</p>
                    <p><strong>Funding Status:</strong> ${project.fundingStatus}</p>
                </div>
                
                <div class="modal-section">
                    <h3><i class="fas fa-star"></i> Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Common sections
        if (project.impact) {
            modalHTML += `
                <div class="modal-section">
                    <h3><i class="fas fa-bullseye"></i> Project Impact</h3>
                    <ul>
                        ${Object.entries(project.impact).map(([key, value]) => `<li><strong>${key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> ${value}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (project.milestones) {
            modalHTML += `
                <div class="modal-section">
                    <h3><i class="fas fa-flag-checkered"></i> Milestones</h3>
                    <ul>
                        ${project.milestones.map(milestone => `<li>${milestone}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (project.timeline && project.timeline.phases) {
            modalHTML += `
                <div class="modal-timeline">
                    <h3><i class="fas fa-project-diagram"></i> Project Timeline</h3>
                    ${project.timeline.phases.map(phase => `
                        <div class="timeline-item">
                            <div class="timeline-date">${phase.date}</div>
                            <div class="timeline-content">
                                <h4>${phase.event}</h4>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        modalHTML += `
            </div>
            
            <div class="modal-actions">
                <button class="modal-action-btn primary" onclick="window.location.href='contact.html?subject=Project Inquiry: ${project.title}'">
                    <i class="fas fa-envelope"></i> Inquire About Project
                </button>
                <button class="modal-action-btn secondary" onclick="window.print()">
                    <i class="fas fa-print"></i> Print Details
                </button>
            </div>
        `;
        
        modalBody.innerHTML = modalHTML;
        projectModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function handleProjectAction(projectId, action) {
        const project = projectData[projectId];
        if (!project) return;
        
        switch(action) {
            case 'updates-btn':
                alert(`Latest updates for "${project.title}" would be displayed here.\n\nThis feature would show recent progress reports, photos, and announcements.`);
                break;
                
            case 'gallery-btn':
                alert(`Photo gallery for "${project.title}" would open here.\n\nThis would show construction progress photos, completed work, and project milestones.`);
                break;
                
            case 'research-btn':
                alert(`Research papers and publications for "${project.title}" would be available here.\n\nThis would include clinical trial results, research findings, and academic publications.`);
                break;
                
            case 'support-btn':
                window.location.href = `contact.html?subject=Support Project: ${project.title}`;
                break;
                
            case 'case-study-btn':
                alert(`Case study for "${project.title}" would open here.\n\nThis would include detailed analysis, lessons learned, and impact assessment.`);
                break;
                
            case 'demo-btn':
                alert(`Live demo of "${project.title}" would start here.\n\nThis would show the telemedicine platform in action or a virtual tour of the facility.`);
                break;
        }
    }
    
    // Close Modal
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            closeModal();
        }
    });
    
    function closeModal() {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Load More Functionality
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more projects
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
            this.innerHTML = '<i class="fas fa-plus"></i> Load More Projects';
            
            // Show message (in real app, you would append new projects)
            alert('More projects would load here. This is a demo.');
        }, 1500);
    });
    
    // Partners slider auto-scroll
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        // Clone the logos for seamless scrolling
        const logos = partnersTrack.innerHTML;
        partnersTrack.innerHTML += logos;
        
        // Pause on hover
        partnersTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        partnersTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    
});