function sleep () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 3000)
  })
}

async function getData () {
  try {
    const data = await sleep()
    console.log(data)
  } catch (error) {
    console.log(123123)
  }
}

getData()
