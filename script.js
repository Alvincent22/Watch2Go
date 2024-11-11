document.addEventListener('DOMContentLoaded', function() {
    const userIcon = document.getElementById('userIcon');
    const sidebar = document.getElementById('sidebar');
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');

    userIcon.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        // Hide both forms when opening the sidebar
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
    });

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !userIcon.contains(event.target)) {
            sidebar.classList.remove('open');
        }
    });

    function showLoginForm() {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginButton.classList.add('active');
        signupButton.classList.remove('active');
        // Clear messages
        document.getElementById('loginMessage').textContent = '';
        document.getElementById('signupMessage').textContent = '';
        // Optionally clear input fields
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    }

    function showSignupForm() {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        signupButton.classList.add('active');
        loginButton.classList.remove('active');
        // Clear messages
        document.getElementById('loginMessage').textContent = '';
        document.getElementById('signupMessage').textContent = '';
        // Optionally clear input fields
        document.getElementById('signupEmail').value = '';
        document.getElementById('signupPassword').value = '';
    }

    loginButton.addEventListener('click', showLoginForm);
    signupButton.addEventListener('click', showSignupForm);
    switchToSignup.addEventListener('click', showSignupForm);
    switchToLogin.addEventListener('click', showLoginForm);

    // Function to show home and movies
    function showHomeAndMovies() {
        document.getElementById('my-home').style.display = 'flex'; 
        document.querySelector('.movie-content').style.display = 'grid'; 
        
        document.querySelectorAll('.movie-card').forEach(movie => {
            movie.style.display = 'block'; 
        });
    }

    // Home link functionality
    document.querySelector('a[href="#my-home"]').addEventListener('click', function(e) {
        e.preventDefault(); 
        showHomeAndMovies(); 
        document.getElementById('my-home').scrollIntoView({ behavior: 'smooth' });
    });

    // All Movies functionality
    document.querySelector('a[href="#all-movies"]').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('my-home').style.display = 'none'; 
        document.querySelector('.movie-content').style.display = 'grid'; 

        document.querySelectorAll('.movie-card').forEach(movie => {
            movie.style.display = 'block'; 
        });
        document.querySelector('.movie-content').scrollIntoView({ behavior: 'smooth' }); 
    });

    // Genre functionality
    document.querySelectorAll('.genre-dropdown li a').forEach(genreLink => {
        genreLink.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedGenre = this.textContent.trim();
            
            document.getElementById('my-home').style.display = 'none'; 
            document.querySelector('.movie-content').style.display = 'grid'; 

            document.querySelectorAll('.movie-card').forEach(movie => {
                const genres = movie.getAttribute('movie-genre');
                if (genres) {
                    const genreList = genres.split(', ');
                    if (genreList.includes(selectedGenre)) {
                        movie.style.display = 'block'; 
                    } else {
                        movie.style.display = 'none'; 
                    }
                } else {
                    movie.style.display = 'none'; 
                }
            });
        });
    });

    const searchInput = document.querySelector('.browse-bar');
    const searchButton = document.querySelector('.button-br');

    function filterMovies(searchTerm) {
        document.getElementById('my-home').style.display = 'none';
        document.querySelector('.movie-content').style.display = 'grid';

        document.querySelectorAll('.movie-card').forEach(movie => {
            const title = movie.querySelector('h3').textContent.toLowerCase();
            const genres = movie.getAttribute('movie-genre').toLowerCase();
            if (title.includes(searchTerm) || genres.includes(searchTerm)) {
                movie.style.display = 'block';
            } else {
                movie.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filterMovies(searchTerm);
        }
    });

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = this.value.toLowerCase().trim();
            if (searchTerm) {
                filterMovies(searchTerm);
            }
        }
    });

    // See Review functionality
    document.querySelectorAll('.review').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const movieId = this.getAttribute('data-movie-id');
            if (movieId) {
                window.location.href = `movie-review.html?movie=${movieId}`;
            }
        });
    });

    // Handle form submissions
    loginForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your login logic here
        console.log('Login submitted');
    });

    signupForm.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your signup logic here
        console.log('Signup submitted');
    });

    function showSectionBasedOnQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        const section = urlParams.get('section');
        const genre = urlParams.get('genre');

        if (section === 'home') {
            showHomeAndMovies();
        } else if (section === 'all-movies') {
            document.getElementById('my-home').style.display = 'none';
            document.querySelector('.movie-content').style.display = 'grid';
            document.querySelectorAll('.movie-card').forEach(movie => {
                movie.style.display = 'block';
            });
            document.querySelector('.movie-content').scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'genre' && genre) {
            document.getElementById('my-home').style.display = 'none';
            document.querySelector('.movie-content').style.display = 'grid';
            document.querySelectorAll('.movie-card').forEach(movie => {
                const genres = movie.getAttribute('movie-genre');
                if (genres && genres.toLowerCase().includes(genre.toLowerCase())) {
                    movie.style.display = 'block';
                } else {
                    movie.style.display = 'none';
                }
            });
            document.querySelector('.movie-content').scrollIntoView({ behavior: 'smooth' });
        }
    }

    showSectionBasedOnQuery();

   
});
