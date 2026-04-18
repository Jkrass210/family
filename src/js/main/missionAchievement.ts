export function initMissionAchievement(): void {
  const element = document.querySelector('.mission-achievement') as HTMLElement;
  
  // Если элемента нет, выходим из функции
  if (!element) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        element.classList.add('show-animation');
        observer.unobserve(element);
      }
    });
  }, { 
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px' // небольшой отступ снизу для более плавного появления
  });

  observer.observe(element);
}