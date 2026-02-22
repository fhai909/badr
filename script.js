// ============================================
// وظائف التفاعل الأساسية
// ============================================

// 1. التبديل بين القائمة والهاتف
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

// 2. زر الاستكشاف
const heroBtn = document.getElementById('heroBtn');
heroBtn.addEventListener('click', () => {
    document.getElementById('sites').scrollIntoView({ behavior: 'smooth' });
    showAlert('⚔️ مرحباً بك في موقع غزوة بدر الكبرى!');
});

// 3. دالة عرض التنبيهات
function showAlert(message) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #1a3a52, #2c5aa0);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        border-right: 4px solid #d4af37;
    `;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => alert.remove(), 400);
    }, 3500);
}

// 4. تأثير الظهور عند التمرير
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.history-card, .site-card, .fact-box, .activity-item, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// 5. تأثير العد التصاعدي للأرقام
function animateNumbers() {
    const numbers = document.querySelectorAll('.history-number, .stat h4');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                
                if (!isNaN(finalValue)) {
                    let current = 0;
                    const increment = finalValue / 50;
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= finalValue) {
                            target.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(current);
                        }
                    }, 30);
                }
                
                target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    numbers.forEach(num => observer.observe(num));
}

// 6. تأثير التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 7. تأثيرات Hover على البطاقات
document.querySelectorAll('.history-card, .site-card, .fact-box, .activity-item, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.16)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
    });
});

// 8. تأثير عند تحريك الماوس على الصور
document.querySelectorAll('.site-image img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(3deg)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// 9. معالج تغيير حجم النافذة
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    }
});

// 10. تأثير التمرير على شريط التنقل
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.16)';
    } else {
        navbar.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
    }
});

// 11. إضافة تأثيرات CSS ديناميكية
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(20px);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// 12. تفعيل المعالم عند النقر
document.querySelectorAll('.site-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.site-content h3').textContent;
        showAlert(`🏛️ ${title} - معلم تاريخي عريق`);
    });
});

// 13. تفعيل الأنشطة عند النقر
document.querySelectorAll('.activity-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        showAlert(`📢 ${title} - نشاط مميز في بدر`);
    });
});

// 14. تتبع الأداء
function trackPageLoad() {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⏱️ وقت تحميل الصفحة: ${loadTime}ms`);
    });
}

// 15. معالج الأخطاء
window.addEventListener('error', (event) => {
    console.error('❌ خطأ:', event.error);
});

// 16. رسالة ترحيب في وحدة التحكم
console.log('%c⚔️ مرحباً بك في موقع غزوة بدر الكبرى ⚔️', 'color: #1a3a52; font-size: 18px; font-weight: bold;');
console.log('%cأول معركة في الإسلام', 'color: #2c5aa0; font-size: 16px; font-style: italic;');
console.log('%c✨ استمتع برحلة تاريخية عريقة ✨', 'color: #d4af37; font-size: 14px;');

// 17. تأثير إضافي: تفاعل عند التمرير على الإحصائيات
document.querySelectorAll('.stat').forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
        this.style.background = 'rgba(212, 175, 55, 0.2)';
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// 18. تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    observeElements();
    animateNumbers();
    trackPageLoad();
});

// 19. تأثير إضافي: عرض معلومات عند تحميل الصفحة
window.addEventListener('load', () => {
    showAlert('🌟 أهلاً وسهلاً في بدر!');
});

// 20. تأثير إضافي: تفاعل على الحقائق
document.querySelectorAll('.fact-box').forEach(box => {
    box.addEventListener('click', () => {
        const title = box.querySelector('h3').textContent;
        showAlert(`📌 حقيقة مهمة: ${title}`);
    });
});

// 21. وظيفة إضافية: تأثير الموجة على النقر
document.querySelectorAll('.hero-btn, .site-card, .activity-item').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// 22. إضافة تأثير الموجة CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
