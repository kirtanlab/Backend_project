// const formDOM = document.querySelector('.form')
// const usernameInputDOM = document.querySelector('.username-input')
// const passwordInputDOM = document.querySelector('.password-input')
// const formAlertDOM = document.querySelector('.form-alert')
// const resultDOM = document.querySelector('.result')
// const btnDOM = document.querySelector('#data')
// const tokenDOM = document.querySelector('.token')


let authorArray = ['Narayanan C. Krishnan', 'R Nitin Auluck', 'Neeraj Goel', 'Deepti R. Bathula', 'Puneet Goyal', 'Balwinder Sodhi', 'Mukesh Saini', 'Ram Subramanian', 'Shashi Shekhar Jha','Sudarshan Iyengar', 'Sujata Pal', 'Shweta Jain', 'Sudeepta Mishra', 'Abhinav Dhall', 'Apurva Mudgal', 'T V Kalyan', 'Anil Shukla'];
let updatedArray = []
const getdata = async(name)=>{
  const resp =await fetch(`https://dblp.org/search/publ/api?q=${name}&format=json`)
  const respdata = await resp.json();
  const result = respdata.result.hits.hit;
// console.log(result)

  const final = result.filter((doc)=>{
      let co_authors =  doc.info.authors.author
      let flag = 0;
      for(let i=0;i<co_authors.length;i++)
      {
          if(co_authors[i].text === name)
          {
              flag = 1;
              break;
          }
      }
      return flag==1
      // console.log(flag);
  })
  
  

  
  const pubs = final.map((doc)=>{
      return doc.info.title;
  })
  const year = final.map((doc)=>{
      return doc.info.year;
  })

  const co_authors = final.map((doc)=>{
      const array_authors = doc.info.authors.author;
      const temp = array_authors.map((doc)=>{
          return doc.text
      })
      
      return temp
  })

  //console.log(final);
  // console.log(co_authors);
  // console.log(result);
  // console.log(year);
  // console.log(pubs);//array of publications (title)
}

const getyear = async (name) => {
  // console.log(result)
  const resp = await fetch(`https://dblp.org/search/publ/api?q=${name}&format=json`)
  const respdata = await resp.json();
  const result = respdata.result.hits.hit;
  const final = result.filter((doc) => {
      let co_authors = doc.info.authors.author
      let flag = 0;
      for (let i = 0; i < co_authors.length; i++) {
          if (co_authors[i].text === name) {
              flag = 1;
              break;
          }
      }
      return flag == 1
  })

  const year = final.map((doc) => {
      return doc.info.year;
  })
  
  // console.log(year);
  return year;
}

const getPublications = async (name) => {
  const resp = await fetch(`https://dblp.org/search/publ/api?q=${name}&format=json`)
  const respdata = await resp.json();
  const result = respdata.result.hits.hit;

  const final = result.filter((doc) => {
      let co_authors = doc.info.authors.author
      let flag = 0;
      for (let i = 0; i < co_authors.length; i++) {
          if (co_authors[i].text === name) {
              flag = 1;
              break;
          }
      }
      return flag == 1
      
  })
  
  const pubs = final.map((doc) => {
      return doc.info.title;
  })


  // console.log(pubs.length);
  return pubs.length;
}


const getCoauthors = async (name) => {
    const resp = await fetch(`https://dblp.org/search/publ/api?q=${name}&format=json`)
  const respdata = await resp.json();
  const result = respdata.result.hits.hit;
  const final = result.filter((doc) => {
      let co_authors = doc.info.authors.author
      let flag = 0;
      for (let i = 0; i < co_authors.length; i++) {
          if (co_authors[i].text === name) {
              flag = 1;
              break;
          }
      }
      return flag == 1
      // console.log(flag);
  })
  const co_authors = final.map((doc) => {
      const array_authors = doc.info.authors.author;
      const temp = array_authors.map((doc) => {
          return doc.text
      })

      return temp
  })

  console.log(co_authors);
  return co_authors;
}


const author = async(name)=>{
  // console.log(name);
  const api = await fetch("/api/v1/all")
  const api_data = await api.json();
  const array_data = api_data.result;
  // console.log(array_data);
  for(i in array_data)
  {
    if(array_data[i]._authName===name)
    {
      array_data[i]._year = await getyear(name);
      array_data[i]._pub = await getPublications(name);
      console.log(array_data[i]);
      return array_data[i];
    }
  }
  

}
const final = async()=>{
  for (obj in authorArray)
  {
    updatedArray.push(await author(authorArray[obj]))
  }
  console.log(updatedArray);
  
  // console.log(array);
  // console.log(new_data);
}
final();
// updateAuthor("Narayanan C. Krishnan")



// formDOM.addEventListener('submit', async (e) => {
//   formAlertDOM.classList.remove('text-success')
//   tokenDOM.classList.remove('text-success')

//   e.preventDefault()
//   const username = usernameInputDOM.value
//   const password = passwordInputDOM.value

//   try {
//     const { data } = await axios.post('/api/v1/login', { username, password })

//     formAlertDOM.style.display = 'block'
//     formAlertDOM.textContent = data.msg

//     formAlertDOM.classList.add('text-success')
//     usernameInputDOM.value = ''
//     passwordInputDOM.value = ''

//     localStorage.setItem('token', data.token)
//     resultDOM.innerHTML = ''
//     tokenDOM.textContent = 'token present'
//     tokenDOM.classList.add('text-success')
//   } catch (error) {
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.textContent = error.response.data.msg
//     localStorage.removeItem('token')
//     resultDOM.innerHTML = ''
//     tokenDOM.textContent = 'no token present'
//     tokenDOM.classList.remove('text-success')
//   }
//   setTimeout(() => {
//     formAlertDOM.style.display = 'none'
//   }, 2000)
// })

// btnDOM.addEventListener('click', async () => {
//   const token = localStorage.getItem('token')
//   try {
//     const { data } = await axios.get('/api/v1/dashboard', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`

//     data.secret
//   } catch (error) {
//     localStorage.removeItem('token')
//     resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`
//   }
// })

// const checkToken = () => {
//   tokenDOM.classList.remove('text-success')

//   const token = localStorage.getItem('token')
//   if (token) {
//     tokenDOM.textContent = 'token present'
//     tokenDOM.classList.add('text-success')
//   }
// }
// checkToken()

// exports ={getdata};
