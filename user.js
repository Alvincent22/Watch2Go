import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, browserLocalPersistence, updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, arrayUnion, arrayRemove, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQY3jXKXE7muVEYv1hAOKoHWXXw-7_hFU",
  authDomain: "login-57a68.firebaseapp.com",
  projectId: "login-57a68",
  storageBucket: "login-57a68.firebasestorage.app",
  messagingSenderId: "812801461673",
  appId: "1:812801461673:web:97b02f478f6abdffd408b8",
  measurementId: "G-13T9ZZXCDG" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
auth.setPersistence(browserLocalPersistence);

function displayMessage(elementId, message, isError = false) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.className = `form-message ${isError ? 'error' : 'success'}`;
}

// Login form handler
const loginSubmit = document.getElementById('loginSubmit');
loginSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Logged in successfully!');
            window.location.reload();
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
            setTimeout(() => {
            }, 1500);
        })
        .catch((error) => {
            let errorMessage;
            switch (error.code) {
                case 'auth/invalid-email':
                case 'auth/missing-email':
                    errorMessage = 'Please enter a valid email address.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email.';
                    break;  
                case 'auth/invalid-credential':
                    errorMessage = 'Wrong email or password.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many failed attempts. Please try again later.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your internet connection.';
                    break;
                case 'auth/internal-error':
                    errorMessage = 'Internal error. Please try again.';
                    break;
                default:
                    errorMessage = `An error occurred (${error.code}). Please try again.`;
            }
            displayMessage('loginMessage', errorMessage, true);
        });
});

// Sign-up form handler
const signupSubmit = document.getElementById('signupSubmit');
signupSubmit.addEventListener("click", function(event) {
    event.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (password.length < 6) {
        displayMessage('signupMessage', 'Password must be at least 6 characters long.', true);
        return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Account created successfully!');
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';
        })
        .catch((error) => {
            let errorMessage;
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already registered.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Please enter a valid email address.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Email/password accounts are not enabled.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Please choose a stronger password.';
                    break;
                default:
                    errorMessage = 'An error occurred. Please try again.';
            }
            displayMessage('signupMessage', errorMessage, true);
        });
});

// Google sign-in handler
document.querySelectorAll('.social-login.google').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        handleGoogleSignIn();
    });
});

function handleGoogleSignIn() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            displayMessage('loginMessage', 'Logged in with Google successfully!');
            window.location.reload();
            document.getElementById('signupMessage').textContent = '';
            document.getElementById('authForms').style.display = 'none';
            document.getElementById('userProfile').style.display = 'block';
            document.getElementById('userName').textContent = user.displayName || user.email.split('@')[0];
            setTimeout(() => {
                document.getElementById('sidebar').classList.remove('open');
            }, 1500);
        })
        .catch((error) => {
            console.error('Google Sign In Error:', error);
            let errorMessage;
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = 'Sign in cancelled by user.';
                    break;
                case 'auth/popup-blocked':
                    errorMessage = 'Pop-up blocked by browser. Please allow pop-ups for this site.';
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
                    break;
                case 'auth/unauthorized-domain':
                    errorMessage = 'This domain is not authorized for Google sign-in. Please contact the administrator.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Google sign-in is not enabled. Please contact the administrator.';
                    break;
                default:
                    errorMessage = `An error occurred during Google sign in: ${error.message}`;
            }
            displayMessage('loginMessage', errorMessage, true);
        });
}

// Update the auth state listener
auth.onAuthStateChanged((user) => {
    const authForms = document.getElementById('authForms');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');

    if (user) {
        if (authForms) authForms.style.display = 'none';
        if (userProfile) userProfile.style.display = 'block';
        if (userName) userName.textContent = user.email.split('@')[0];
        loadProfilePicture(user);
        setTimeout(() => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.remove('open');
        }, 1500);
    } else {
        if (authForms) authForms.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
    }
});

document.getElementById('logoutButton').addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
        auth.signOut().then(() => {
            alert('Logged out successfully!');
            window.location.reload();
        }).catch((error) => {
            console.error('Error signing out:', error);
            alert('Error logging out. Please try again.');
        });
    }
});

// Event listener for posting a comment
document.addEventListener('click', async function (event) {
    if (event.target && event.target.id === 'postCommentButton') {
        const user = auth.currentUser;
        const commentInput = document.getElementById('commentInput');
        const movieId = new URLSearchParams(window.location.search).get('movie');

        if (user) {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const newComment = {
                    username: user.email.split('@')[0],
                    text: commentText,
                    timestamp: new Date(),
                    movieId: movieId,
                    likes: [],
                    userPhotoURL: user.photoURL || null
                };

                try {
                    // Add the comment to Firestore
                    const docRef = await addDoc(collection(db, "comments"), newComment);
                    
                    // Clear the input field
                    commentInput.value = '';
                    
                    // Create and display the new comment immediately
                    const commentsSection = document.querySelector('.comments-section');
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');
                    commentDiv.innerHTML = `
                        <div class="comment-user">
                            <div class="user-icon">
                                ${user.photoURL ? 
                                    `<img src="${user.photoURL}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` :
                                    `<i class="fa-solid fa-user"></i>`
                                }
                            </div>
                            <span class="username">${newComment.username}</span>
                            <span class="time-ago" style="color: gray;">${newComment.timestamp.toLocaleString()}</span>
                            <div class="comment-options">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                <div class="comment-dropdown">
                                    <button class="edit-comment">
                                        <i class="fa-solid fa-pen"></i>Edit
                                    </button>
                                    <button class="delete-comment">
                                        <i class="fa-solid fa-trash"></i>Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="comment-content">
                            <p>${newComment.text}</p>
                            <div class="comment-actions">
                                <button class="likes" data-comment-id="${docRef.id}">
                                    <i class="fa-solid fa-thumbs-up"></i> 0
                                </button>
                                <button class="reply-btn" data-comment-id="${docRef.id}">Reply</button>
                            </div>
                        </div>
                        <div class="reply-form" style="display: none;">
                            <div class="reply-form-container">
                                <input type="text" class="reply-input" placeholder="Write a reply...">
                                <div class="reply-buttons">
                                    <button class="post-reply-btn">Reply</button>
                                    <button class="cancel-reply-btn">Cancel</button>
                                </div>
                            </div>
                        </div>
                        <div class="replies"></div>
                    `;
                    
                    // Add event listeners for the new comment
                    const likeButton = commentDiv.querySelector('.likes');
                    likeButton.addEventListener('click', () => handleLike(docRef.id, likeButton));

                    const replyBtn = commentDiv.querySelector('.reply-btn');
                    const replyForm = commentDiv.querySelector('.reply-form');
                    const postReplyBtn = commentDiv.querySelector('.post-reply-btn');
                    const cancelReplyBtn = commentDiv.querySelector('.cancel-reply-btn');
                    const repliesDiv = commentDiv.querySelector('.replies');

                    replyBtn.addEventListener('click', () => {
                        replyForm.style.display = 'block';
                    });

                    cancelReplyBtn.addEventListener('click', () => {
                        replyForm.style.display = 'none';
                        replyForm.querySelector('.reply-input').value = '';
                    });

                    postReplyBtn.addEventListener('click', async () => {
                        const replyInput = commentDiv.querySelector('.reply-input');
                        const replyText = replyInput.value.trim();
                        if (replyText && user) {
                            await handleReply(docRef.id, replyText, repliesDiv);
                            replyInput.value = '';
                            replyForm.style.display = 'none';
                        }
                    });

                    // Insert the new comment at the top of the comments section
                    const commentsHeading = commentsSection.querySelector('h2');
                    const addCommentDiv = commentsSection.querySelector('.add-comment');
                    commentsSection.insertBefore(commentDiv, addCommentDiv.nextSibling);

                } catch (error) {
                    console.error("Error adding comment: ", error);
                }
            }
        } else {
            alert("You need to login to your account first before posting a comment.");
        }
    }
});

// Function to display comments for the specific movie
async function displayComments(movieId) {
    const commentsSection = document.querySelector('.comments-section');
    commentsSection.innerHTML = '';

    const commentsHeading = document.createElement('h2');
    commentsHeading.textContent = "Comments / Reviews";
    commentsSection.appendChild(commentsHeading);

    const addCommentDiv = document.createElement('div');
    addCommentDiv.classList.add('add-comment');
    addCommentDiv.innerHTML = `
        <input type="text" id="commentInput" placeholder="Add a comment..." autocomplete="off"/>
        <button class="post-btn" id="postCommentButton">Post</button>
    `;
    commentsSection.appendChild(addCommentDiv);

    const querySnapshot = await getDocs(collection(db, "comments"));
    let movieComments = querySnapshot.docs.filter(doc => {
        const data = doc.data();
        return data.movieId === movieId && !data.parentCommentId; // Only get parent comments
    });

    // Sort comments by timestamp in descending order (newest first)
    movieComments.sort((a, b) => {
        const timestampA = a.data().timestamp.toDate().getTime();
        const timestampB = b.data().timestamp.toDate().getTime();
        return timestampB - timestampA;  // For newest first
    });

    const currentUser = auth.currentUser;    
    for (const doc of movieComments) {
            const comment = doc.data();
            const likes = comment.likes || [];
            const isCurrentUser = currentUser && currentUser.email.split('@')[0] === comment.username;
            const isLiked = currentUser && likes.includes(currentUser.uid);
            
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <div class="comment-user">
                    <div class="user-icon">
                        ${comment.userPhotoURL ? 
                            `<img src="${comment.userPhotoURL}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` :
                            `<i class="fa-solid fa-user"></i>`
                        }
                    </div>
                    <span class="username">${comment.username}</span>
                    <span class="time-ago" style="color: gray;">${comment.timestamp.toDate().toLocaleString()}</span>
                    ${isCurrentUser ? `
                        <div class="comment-options">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                            <div class="comment-dropdown">
                                <button class="edit-comment">
                                    <i class="fa-solid fa-pen"></i>Edit
                                </button>
                                <button class="delete-comment">
                                    <i class="fa-solid fa-trash"></i>Delete
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="comment-content">
                    <p>${comment.text}</p>
                    <div class="comment-actions">
                        <button class="likes ${isLiked ? 'liked' : ''}" data-comment-id="${doc.id}">
                            <i class="fa-solid fa-thumbs-up"></i> ${likes.length}
                        </button>
                        <button class="reply-btn" data-comment-id="${doc.id}">Reply</button>
                        <button class="show-replies-btn" style="display: none;">Show replies</button>
                    </div>
                    <div class="reply-form" style="display: none;">
                        <div class="reply-form-container">
                            <input type="text" class="reply-input" placeholder="Write a reply...">
                            <div class="reply-buttons">
                                <button class="post-reply-btn">Reply</button>
                                <button class="cancel-reply-btn">Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div class="replies" style="display: none;"></div>
                </div>
            `;
            commentDiv.dataset.commentId = doc.id;
            commentsSection.appendChild(commentDiv);

            // Add event listeners
            const likeButton = commentDiv.querySelector('.likes');
            likeButton.addEventListener('click', () => handleLike(doc.id, likeButton));

            const replyBtn = commentDiv.querySelector('.reply-btn');
            const replyForm = commentDiv.querySelector('.reply-form');
            const postReplyBtn = commentDiv.querySelector('.post-reply-btn');
            const cancelReplyBtn = commentDiv.querySelector('.cancel-reply-btn');
            const repliesDiv = commentDiv.querySelector('.replies');

            replyBtn.addEventListener('click', () => {
                const user = auth.currentUser;
                if (!user) {
                    alert("Please login to reply to comments");
                    return;
                }
                replyForm.style.display = 'block';
            });

            cancelReplyBtn.addEventListener('click', () => {
                replyForm.style.display = 'none';
                replyForm.querySelector('.reply-input').value = ''; // Clear input when canceling
            });

            postReplyBtn.addEventListener('click', async () => {
                const replyInput = commentDiv.querySelector('.reply-input');
                const replyText = replyInput.value.trim();
                if (replyText && currentUser) {
                    await handleReply(doc.id, replyText, repliesDiv);
                    replyInput.value = '';
                    replyForm.style.display = 'none';
                }
            });

            // Add event listener for show/hide replies
            const showRepliesBtn = commentDiv.querySelector('.show-replies-btn');
            showRepliesBtn.addEventListener('click', () => {
                const isHidden = repliesDiv.style.display === 'none';
                repliesDiv.style.display = isHidden ? 'block' : 'none';
                showRepliesBtn.textContent = isHidden ? 'Hide replies' : 'Show replies';
            });

            // Load existing replies
            await loadReplies(doc.id, repliesDiv);
    }
}

// Add these new functions for handling replies
async function handleReply(parentCommentId, replyText, repliesDiv) {
    const user = auth.currentUser;
    if (!user) {
        alert("Please login to reply to comments");
        return;
    }

    const newReply = {
        username: user.email.split('@')[0],
        text: replyText,
        timestamp: new Date(),
        parentCommentId: parentCommentId,
        likes: [],
        movieId: new URLSearchParams(window.location.search).get('movie'),
        userPhotoURL: user.photoURL || null
    };

    try {
        // Add the comment to Firestore
        const docRef = await addDoc(collection(db, "comments"), newReply);
        
        // Create and display the new reply immediately
        const replyDiv = document.createElement('div');
        replyDiv.classList.add('comment', 'reply');
        replyDiv.innerHTML = `
            <div class="comment-user">
                <div class="user-icon">
                    ${user.photoURL ? 
                        `<img src="${user.photoURL}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` :
                        `<i class="fa-solid fa-user"></i>`
                    }
                </div>
                <span class="username">${newReply.username}</span>
                <span class="time-ago" style="color: gray;">${newReply.timestamp.toLocaleString()}</span>
                <div class="comment-options">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    <div class="comment-dropdown">
                        <button class="edit-comment">
                            <i class="fa-solid fa-pen"></i>Edit
                        </button>
                        <button class="delete-comment">
                            <i class="fa-solid fa-trash"></i>Delete
                        </button>
                    </div>
                </div>
            </div>
            <div class="comment-content">
                <p>${replyText}</p>
                <div class="comment-actions">
                    <button class="likes" data-comment-id="${docRef.id}">
                        <i class="fa-solid fa-thumbs-up"></i> 0
                    </button>
                </div>
            </div>
        `;

        // Add event listener for the like button
        const likeButton = replyDiv.querySelector('.likes');
        likeButton.addEventListener('click', () => handleLike(docRef.id, likeButton));

        // Add the new reply to the replies section
        repliesDiv.appendChild(replyDiv);

        const showRepliesBtn = repliesDiv.parentElement.querySelector('.show-replies-btn');
        if (showRepliesBtn) {
            showRepliesBtn.style.display = 'block';
            showRepliesBtn.textContent = 'Hide replies';
        }

        repliesDiv.style.display = 'block';

    } catch (error) {
        console.error("Error adding reply: ", error);
        alert("Error posting reply. Please try again.");
    }
}

async function loadReplies(parentCommentId, repliesDiv) {
    const querySnapshot = await getDocs(collection(db, "comments"));
    let replies = querySnapshot.docs.filter(doc => doc.data().parentCommentId === parentCommentId);
    
    // Sort replies by timestamp in ascending order (oldest first for replies)
    replies.sort((a, b) => {
        const timestampA = a.data().timestamp.toDate();
        const timestampB = b.data().timestamp.toDate();
        return timestampA - timestampB;  // For oldest first in replies
    });
    
    // Show/hide the show replies button based on whether there are replies
    const showRepliesBtn = repliesDiv.parentElement.querySelector('.show-replies-btn');
    showRepliesBtn.style.display = replies.length > 0 ? 'block' : 'none';
    
    for (const replyDoc of replies) {
        await displayReply(replyDoc.data(), repliesDiv, replyDoc.id);
    }
}

async function displayReply(reply, repliesDiv, replyId) {
    const currentUser = auth.currentUser;
    const likes = reply.likes || [];
    const isLiked = currentUser && likes.includes(currentUser.uid);
    const isCurrentUser = currentUser && currentUser.email.split('@')[0] === reply.username;

    const replyDiv = document.createElement('div');
    replyDiv.classList.add('comment', 'reply');
    replyDiv.dataset.commentId = replyId;
    replyDiv.innerHTML = `
        <div class="comment-user">
            <div class="user-icon">
                ${reply.userPhotoURL ? 
                    `<img src="${reply.userPhotoURL}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` :
                    `<i class="fa-solid fa-user"></i>`
                }
            </div>
            <span class="username">${reply.username}</span>
            <span class="time-ago" style="color: gray;">${reply.timestamp.toDate().toLocaleString()}</span>
            ${isCurrentUser ? `
                <div class="comment-options">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    <div class="comment-dropdown">
                        <button class="edit-comment">
                            <i class="fa-solid fa-pen"></i>Edit
                        </button>
                        <button class="delete-comment">
                            <i class="fa-solid fa-trash"></i>Delete
                        </button>
                    </div>
                </div>
            ` : ''}
        </div>
        <div class="comment-content">
            <p>${reply.text}</p>
            <div class="comment-actions">
                <button class="likes ${isLiked ? 'liked' : ''}" data-comment-id="${replyId}">
                    <i class="fa-solid fa-thumbs-up"></i> ${likes.length}
                </button>
            </div>
        </div>
    `;
    repliesDiv.appendChild(replyDiv);

    const likeButton = replyDiv.querySelector('.likes');
    likeButton.addEventListener('click', () => handleLike(replyId, likeButton));
}
// Call displayComments with the movie ID when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const movieId = new URLSearchParams(window.location.search).get('movie');
    if (movieId) {
        displayComments(movieId);
    }
});

async function handleLike(commentId, likeButton) {
    const user = auth.currentUser;
    
    if (!user) {
        alert("Please login to like comments");
        return;
    }

    try {
        const commentRef = doc(db, "comments", commentId);
        const commentDoc = await getDoc(commentRef);
        
        // Add check to ensure the comment exists
        if (!commentDoc.exists()) {
            console.error("Comment not found");
            return;
        }

        const likes = commentDoc.data().likes || [];
        const userId = user.uid;

        if (likes.includes(userId)) {
            await updateDoc(commentRef, {
                likes: arrayRemove(userId)
            });
            likeButton.classList.remove('liked');
        } else {
            await updateDoc(commentRef, {
                likes: arrayUnion(userId)
            });
            likeButton.classList.add('liked');
        }

        // Update like count after the operation
        const updatedDoc = await getDoc(commentRef);
        const updatedLikes = updatedDoc.data().likes || [];
        likeButton.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${updatedLikes.length}`;

    } catch (error) {
        console.error("Error updating like: ", error);
        alert("Error updating like. Please try again.");
    }
}

// Add this event listener to handle dropdown toggles
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.comment-dropdown');
    
    // If clicking on ellipsis, check if user owns the comment
    if (event.target.closest('.comment-options')) {
        const user = auth.currentUser;
        if (!user) return;

        const commentDiv = event.target.closest('.comment');
        const username = commentDiv.querySelector('.username').textContent;
        
        // If not the comment owner, don't open dropdown
        if (user.email.split('@')[0] !== username) {
            return;
        }
        
        const options = event.target.closest('.comment-options');
        const dropdown = options.querySelector('.comment-dropdown');
        
        // Close all other dropdowns
        dropdowns.forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
        event.stopPropagation();
    }
    
    // Close all dropdowns when clicking outside
    if (!event.target.closest('.comment-options')) {
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});

// Add event listeners for edit, delete, and save buttons
document.addEventListener('click', async function(event) {  
    const user = auth.currentUser;
    if (!user) return;

    // Handle Edit button click
    if (event.target.closest('.edit-comment')) {
        const commentDiv = event.target.closest('.comment');
        const commentContent = commentDiv.querySelector('.comment-content');
        const originalText = commentContent.querySelector('p').textContent;
        
        // Create edit form
        const editForm = document.createElement('div');
        editForm.classList.add('edit-comment-form');
        editForm.innerHTML = `
            <input type="text" class="edit-input" value="${originalText}" autocomplete="off">
            <div class="edit-buttons">
                <button class="save-edit">Save</button>
                <button class="cancel-edit">Cancel</button>
            </div>
        `;
        
        // Replace the comment content with the edit form
        commentContent.querySelector('p').style.display = 'none';
        commentContent.querySelector('.comment-actions').style.display = 'none';
        commentContent.insertBefore(editForm, commentContent.firstChild);
        
        // Focus on the input
        const input = editForm.querySelector('.edit-input');
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
        
        // Close dropdown
        commentDiv.querySelector('.comment-dropdown').classList.remove('active');
    }
    
    // Handle Save button click
    if (event.target.classList.contains('save-edit')) {
        const commentDiv = event.target.closest('.comment');
        const commentContent = commentDiv.querySelector('.comment-content');
        const newText = commentContent.querySelector('.edit-input').value.trim();
        const commentId = commentDiv.dataset.commentId;


        if (newText) {
            try {
                // Update the comment in Firebase
                const commentRef = doc(db, "comments", commentId);
                await updateDoc(commentRef, {
                    text: newText,
                    editedAt: new Date() // Optional: track edit time
                });

                // Update the UI
                const commentTextElement = commentContent.querySelector('p');
                commentTextElement.textContent = newText;
                commentTextElement.style.display = 'block';

                // Remove edit form
                const editForm = commentContent.querySelector('.edit-comment-form');
                if (editForm) editForm.remove();

                // Show comment actions
                commentContent.querySelector('.comment-actions').style.display = 'flex';


            } catch (error) {
                console.error("Error updating comment: ", error);
                alert('Error updating comment. Please check your internet connection.');
            }
        }
    }
    
    // Handle Delete button click
    if (event.target.closest('.delete-comment')) {
        const commentDiv = event.target.closest('.comment');
        const commentId = commentDiv.dataset.commentId;
        
        if (confirm('Are you sure you want to delete this comment?')) {
            try {
                await deleteDoc(doc(db, "comments", commentId));
                commentDiv.remove();
            } catch (error) {
                console.error("Error deleting comment: ", error);
                alert('Error deleting comment');
            }
        }
        
        // Close dropdown
        commentDiv.querySelector('.comment-dropdown').classList.remove('active');
    }
});

// Handle Cancel button click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('cancel-edit')) {
        const commentDiv = event.target.closest('.comment');
        const commentContent = commentDiv.querySelector('.comment-content');
        
        // Remove edit form
        const editForm = commentContent.querySelector('.edit-comment-form');
        if (editForm) editForm.remove();
        
        // Show original content
        commentContent.querySelector('p').style.display = 'block';
        commentContent.querySelector('.comment-actions').style.display = 'flex';
    }
});

// Add this event listener for avatar upload
document.addEventListener('change', async function(event) {
    if (event.target.id === 'avatarUpload') {
        const user = auth.currentUser;
        if (!user) {
            alert('Please login to upload a profile picture');
            return;
        }

        const file = event.target.files[0];
        if (!file) return;

        // Check file type and size
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('Please upload an image smaller than 5MB');
            return;
        }

        try {
            // Show loading state
            const avatarIcon = document.querySelector('.profile-avatar i');
            const originalIcon = avatarIcon ? avatarIcon.className : '';
            if (avatarIcon) avatarIcon.className = 'fas fa-spinner fa-spin';    

            // Create a reference to the file location with user ID in filename
            const fileName = `${user.uid}_${new Date().getTime()}.${file.name.split('.').pop()}`;
            const storageRef = ref(storage, `profilePictures/${fileName}`);

            // Upload the file with metadata
            const metadata = {
                contentType: file.type,
            };
            
            const uploadTask = await uploadBytes(storageRef, file, metadata);


            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);

            // Update user's profile
            await updateProfile(user, {
                photoURL: downloadURL
            });

            // Add this new code to update all comments and replies
            const username = user.email.split('@')[0];
            const commentsRef = collection(db, "comments");
            const userComments = await getDocs(commentsRef);

            // Update all comments by this user
            userComments.forEach(async (doc) => {
                const comment = doc.data();
                if (comment.username === username) {
                    await updateDoc(doc.ref, {
                        userPhotoURL: downloadURL
                    });
                }
            });

            // Update UI for all visible comments and replies
            const allUserIcons = document.querySelectorAll(`.comment-user .user-icon`);
            allUserIcons.forEach(icon => {
                const usernameElement = icon.parentElement.querySelector('.username');
                if (usernameElement && usernameElement.textContent === username) {
                    icon.innerHTML = `<img src="${downloadURL}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                }
            });

            // Update the avatar display
            const profileAvatar = document.querySelector('.profile-avatar');
            if (profileAvatar) {
                profileAvatar.innerHTML = `
                    <img src="${downloadURL}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
                    <label class="avatar-upload">
                        <i class="fas fa-camera"></i>
                        <input type="file" accept="image/*" id="avatarUpload">
                    </label>
                `;
            }

            alert('Profile picture updated successfully!');

        } catch (error) {
            console.error('Detailed error:', error); // More detailed error logging
            alert(`Error uploading profile picture: ${error.message}`);
            
            // Restore original icon if there's an error
            const avatarIcon = document.querySelector('.profile-avatar i');
            if (avatarIcon && originalIcon) {
                avatarIcon.className = originalIcon;
            }
        }
    }
});

// Add this function to load profile picture when user logs in
function loadProfilePicture(user) {
    const profileAvatar = document.querySelector('.profile-avatar');
    if (user.photoURL) {
        profileAvatar.innerHTML = `
            <img src="${user.photoURL}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
            <label class="avatar-upload">
                <i class="fas fa-camera"></i>
                <input type="file" accept="image/*" id="avatarUpload">
            </label>
        `;
    } else {
        profileAvatar.innerHTML = `
            <i class="fas fa-user-circle fa-3x"></i>
            <label class="avatar-upload">
                <i class="fas fa-camera"></i>
                <input type="file" accept="image/*" id="avatarUpload">
            </label>
        `;
    }
}
