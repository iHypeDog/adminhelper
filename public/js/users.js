// Users Management JavaScript Functions

// Toast notification function
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Delete user function
async function deleteUser(userId, username) {
    if (confirm(`Tem certeza que deseja excluir o usuário "${username}"?`)) {
        try {
            const response = await fetch(`/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                showToast(result.message);
                
                // Remove user row from table
                const userRow = document.querySelector(`button[onclick*="${userId}"]`).closest('tr');
                if (userRow) {
                    userRow.style.transition = 'all 0.3s ease';
                    userRow.style.opacity = '0';
                    userRow.style.transform = 'translateX(-100%)';
                    
                    setTimeout(() => {
                        userRow.remove();
                        updateStats();
                    }, 300);
                }
            } else {
                showToast(result.message, 'danger');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            showToast('Erro ao excluir usuário', 'danger');
        }
    }
}

// Update stats cards
function updateStats() {
    const totalUsers = document.querySelectorAll('tbody tr').length;
    const adminUsers = document.querySelectorAll('.badge.bg-danger').length;
    const regularUsers = totalUsers - adminUsers;
    
    const statCards = document.querySelectorAll('.card h3');
    if (statCards.length >= 3) {
        statCards[0].textContent = totalUsers;
        statCards[1].textContent = adminUsers;
        statCards[2].textContent = regularUsers;
    }
}

// Handle create user form submission
document.addEventListener('DOMContentLoaded', function() {
    const createUserForm = document.getElementById('createUserForm');
    
    if (createUserForm) {
        createUserForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Criando...';
            submitButton.disabled = true;
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showToast(result.message);
                    
                    // Close modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('createUserModal'));
                    modal.hide();
                    
                    // Reset form
                    this.reset();
                    
                    // Reload page to show new user
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    showToast(result.message, 'danger');
                }
            } catch (error) {
                console.error('Error creating user:', error);
                showToast('Erro ao criar usuário', 'danger');
            } finally {
                // Restore button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    // Add password strength indicator
    const passwordField = document.getElementById('newPassword');
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            showPasswordStrength(strength);
        });
    }
    
    // Add animations to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 100);
    });
});

// Calculate password strength
function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    return strength;
}

// Show password strength
function showPasswordStrength(strength) {
    const passwordField = document.getElementById('newPassword');
    const existingIndicator = document.getElementById('passwordStrength');
    
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (passwordField.value.length > 0) {
        const indicator = document.createElement('div');
        indicator.id = 'passwordStrength';
        indicator.className = 'mt-1';
        
        let strengthText, strengthClass;
        
        switch (strength) {
            case 0:
            case 1:
                strengthText = 'Muito Fraca';
                strengthClass = 'text-danger';
                break;
            case 2:
                strengthText = 'Fraca';
                strengthClass = 'text-warning';
                break;
            case 3:
                strengthText = 'Média';
                strengthClass = 'text-info';
                break;
            case 4:
                strengthText = 'Forte';
                strengthClass = 'text-success';
                break;
            case 5:
                strengthText = 'Muito Forte';
                strengthClass = 'text-success fw-bold';
                break;
        }
        
        indicator.innerHTML = `<small class="${strengthClass}">Força da senha: ${strengthText}</small>`;
        passwordField.parentNode.appendChild(indicator);
    }
}