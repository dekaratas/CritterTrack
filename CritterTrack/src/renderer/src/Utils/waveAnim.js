function randomAnimation() {
  const paths = document.querySelectorAll('#visual path')

  paths.forEach((path) => {
    const randomHeight = Math.random() * 20
    const translateY = Math.random() > 0.5 ? randomHeight : -randomHeight

    path.style.transition = 'transform 2s ease-in-out'
    path.style.transform = `translateY(${translateY}px)`
  })
}

randomAnimation()

setInterval(randomAnimation, 2000)
