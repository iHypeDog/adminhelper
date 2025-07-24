// Dashboard JavaScript Functions

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

// Increment counter function
async function incrementCounter(type) {
    try {
        const response = await fetch(`/increment/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Update counter display
            const countElement = document.getElementById(`${type}Count`);
            if (countElement) {
                countElement.textContent = result.newCount;
                countElement.parentElement.parentElement.classList.add('success-animation');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    countElement.parentElement.parentElement.classList.remove('success-animation');
                }, 600);
            }
            
            // Update summary stats
            updateSummaryStats();
            
            showToast(result.message);
        } else {
            showToast(result.message, 'danger');
        }
    } catch (error) {
        console.error('Error incrementing counter:', error);
        showToast('Erro ao registrar contador', 'danger');
    }
}

// Update summary stats
function updateSummaryStats() {
    const chamados = document.getElementById('chamadoCount').textContent;
    const tickets = document.getElementById('ticketCount').textContent;
    const devolucoes = document.getElementById('devolucaoCount').textContent;
    
    // Update summary section if it exists
    const summaryStats = document.querySelectorAll('.stat-number');
    if (summaryStats.length >= 3) {
        summaryStats[0].textContent = chamados;
        summaryStats[1].textContent = tickets;
        summaryStats[2].textContent = devolucoes;
    }
}

// Show report modal
function showReportModal() {
    const modal = new bootstrap.Modal(document.getElementById('reportModal'));
    modal.show();
}

// Handle report form submission
document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('reportForm');
    
    if (reportForm) {
        reportForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/reports', {
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
                    const modal = bootstrap.Modal.getInstance(document.getElementById('reportModal'));
                    modal.hide();
                    
                    // Reset form
                    this.reset();
                    
                    // Update ticket counter (reports increment ticket counter)
                    const ticketCount = document.getElementById('ticketCount');
                    if (ticketCount) {
                        const currentCount = parseInt(ticketCount.textContent);
                        ticketCount.textContent = currentCount + 1;
                        updateSummaryStats();
                    }
                } else {
                    showToast(result.message, 'danger');
                }
            } catch (error) {
                console.error('Error submitting report:', error);
                showToast('Erro ao enviar relatório', 'danger');
            }
        });
    }
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button[onclick*="incrementCounter"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Registrando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
});