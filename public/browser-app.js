// const formDOM = document.querySelector('.form')
// const usernameInputDOM = document.querySelector('.username-input')
// const passwordInputDOM = document.querySelector('.password-input')
// const formAlertDOM = document.querySelector('.form-alert')
// const resultDOM = document.querySelector('.result')
// const btnDOM = document.querySelector('#data')
// const tokenDOM = document.querySelector('.token')


let authorArray = ['Narayanan C. Krishnan', 'R Nitin Auluck', 'Neeraj Goel', 'Deepti R. Bathula', 'Puneet Goyal', 'Balwinder Sodhi', 'Mukesh Saini', 'Ram Subramanian', 'Shashi Shekhar Jha','Sudarshan Iyengar', 'Sujata Pal', 'Shweta Jain', 'Sudeepta Mishra', 'Abhinav Dhall', 'Apurva Mudgal', 'T V Kalyan', 'Anil Shukla'];
let updatedArray = []
let name;
const getname = async() => {
    
    console.log("clicked");
    let auth_name = document.querySelector('input').value;
    name = auth_name;
    
    const api = await fetch("/api/v1/all")
    const api_data = await api.json();
    const array_data = api_data.result;
    // console.log(array_data);

    for(i in array_data)
    {
      if(array_data[i]._authName===name)
      {
        array_data[i]._year = await getyear(name);
        //console.log("year fun: " +array_data[i]._year);
        array_data[i]._pub = await getPublications(name);
        //console.log("deblp" + array_data[i]._dblp_id);
        //return 
        //console.log(array_data[i]);
      }
    }

    //let prof_log = document.getElementsByClassName("profile-login");
    //prof_log.style.display = "block";
    
    $('.profile-login').css('display','block');
    $('.boxed').css('display','block');
    //let boxed = document.getElementsByClassName("boxed"); 
    //boxed.style.display = "block";
    //extract email,dblp id and name
    console.log("Name: "+ name);
    for(i in array_data)
    {
      if(array_data[i]._authName === name)
      {
       let auth_name = array_data[i]._authName;
       let auth_email_id = array_data[i]._email;
       let auth_dblp_id = array_data[i]._dblp_id;
        console.log("working");
        document.getElementById("index_faculty_name").textContent = auth_name;

        document.getElementById("index_email_id").textContent = auth_email_id;

        $("#index_dblp_id").attr("href","faculty-profile.html");
        document.getElementById("index_dblp_id").textContent = "View Profile";
      }
    }
}
/*
const get_name_browser = () =>{
    let auth_name = document.querySelector('input').value;
    console.log("Name Outside: " + auth_name);
    return auth_name;
}*/




//get naame
/* /api/v1/author?name=
let names = ['Narayanan C. Krishnan', 'R Nitin Auluck', 'Neeraj Goel', 'Deepti R. Bathula', 'Puneet Goyal', 'Balwinder Sodhi', 'Mukesh Saini', 'Ram Subramanian', 'Shashi Shekhar Jha','Sudarshan Iyengar', 'Sujata Pal', 'Shweta Jain', 'Sudeepta Mishra', 'Abhinav Dhall', 'Apurva Mudgal', 'T V Kalyan', 'Anil Shukla'];
const getname =  () =>{
    let get_name = '';
    get_name = document.getElementById("input_name").value;
    let flag = 1;
    //for(let i=0;i <names.length;i++){s
        //if(names[i] == get_name){
            //flag = 0;
        //}
    //}
    //console.logf(flag == 0){
        //get_name += "try agian";
    //}
    console.log("name: "+ get_name);
    return get_name;
}

let name = getname();
*/


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
  
  

    //array of titles of publications
    const pubs = final.map((doc)=>{
        return doc.info.title;
    })


    //array of years of publication published
    const year = final.map((doc)=>{
        return doc.info.year;
    })
    //console.log("year"+year)

    //array of coauthors for table
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


    /*NEW*/

    //Table data 
    let cothors = co_authors;

    //co-author list for co-author section
    const filtred_co_authos = final.map((doc) => {
        const array_authors =  doc.info.authors.author;
        const temp = array_authors.map((doc) => {
            if(doc.text != name){
                return doc.text
            }
        })
        return temp
    })
    let filtered_cothors = filtred_co_authos; //filtered list
    
    


    //CONNECTING FRONT_END
    //publication
    buildTable()

    function buildTable() {
        var table = document.getElementById('myTable')
        table.innerHTML = ''
        for (var i = 0; i < year.length; i++) {
            var row = `<tr>
                        <td id="td">${year[i]}</td>
                        <td>${pubs[i]}</td>
                        <td>${cothors[i]}</td>
                        </tr>`
            table.innerHTML += row;
        }
    }

    //publication completed

    //co_author section t
    
    co_buildTable()

    function co_buildTable() {
        var co_table = document.getElementById('co_myTable')
        co_table.innerHTML = ''
        for (var i = 0; i < year.length; i++) {
            var co_row = `<tr>
                        <td id="td">${filtered_cothors[i]}</td>
                        </tr>`
            co_table.innerHTML += co_row;
        }
    }
    //co_author end
    
    //wordcloud
    /*console.log('pubs: '+ pubs[0]);
    let names = ' ';
    for(let i=0;i < pubs.length;i++){
        names += pubs[i];
    }

    fetch(`https://quickchart.io/wordcloud?backgroundColor=black&text=${names}`)
        .then(res=>{return res.blob()})
        .then(blob=>{
        var img = URL.createObjectURL(blob);
        //console.log(img);
        document.getElementById('img').setAttribute('src', img);
    })
    */
}

getdata(name)

//GET YEAR

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


//get publication
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
  return pubs.length;
}



const author = async(name)=>{
    //console.log(name);
    //const result = await fetch(`/api/v1/author?name=${name}`)
    //const respdata = await result.json();
    //console.log(respdata);
    const api = await fetch("/api/v1/all")
    const api_data = await api.json();
    const array_data = api_data.result;
    // console.log(array_data);
    for(i in array_data)
    {
      if(array_data[i]._authName===name)
      {
        array_data[i]._year = await getyear(name);
        //console.log("year fun: " +array_data[i]._year);
        array_data[i]._pub = await getPublications(name);
        //console.log("deblp" + array_data[i]._dblp_id);
        //return 
        console.log(array_data[i]);
      }
    }

    //extract email,dblp id and name
    for(i in array_data)
    {
      if(array_data[i]._authName===name)
      {
       let auth_name = array_data[i]._authName;
       let auth_email_id = array_data[i]._email;
       let auth_dblp_id = array_data[i]._dblp_id;

        document.getElementById("faculty_name").textContent = auth_name;

        //$("#email_id").attr("href",auth_email_id);
        //$("#dbpl_id").innerHTML = auth_email_id;
        document.getElementById("email_id").textContent = auth_email_id;


        $("#dblp_id").attr("href",auth_dblp_id);
        //$("#dbpl_id").attr("value",auth_dblp_id);
        document.getElementById("dblp_id").textContent = auth_dblp_id;
      }
    }
}

const dummy = async (name)=>{
    const resp = await fetch(`/api/v1/author?name=${name}`);
    const respdata = await resp.json();
    console.log(respdata);
}
dummy("Neeraj Goel");
author(name)




  
//for index.html

const getauth_name = async(name) => {
    const api = await fetch("/api/v1/all")
    const api_data = await api.json();
    const array_data = api_data.result;
    
    console.log(name);
    
    // console.log(array_data);
    for(i in array_data)
    {
      if(array_data[i]._authName===name)
      {
        array_data[i]._year = await getyear(name);
        //console.log("year fun: " +array_data[i]._year);
        array_data[i]._pub = await getPublications(name);
        //console.log("deblp" + array_data[i]._dblp_id);
        //return 
        //console.log(array_data[i]);
      }
    }
    let prof_log = document.getElementsByClassName("profile-login");
    prof_log.style.display = "block";
    
    let boxed = document.getElementsByClassName("boxed"); 
    boxed.style.display = "block";
    //extract email,dblp id and name
    
    for(i in array_data)
    {
      if(array_data[i]._authName===name)
      {
       let auth_name = array_data[i]._authName;
       let auth_email_id = array_data[i]._email;
       let auth_dblp_id = array_data[i]._dblp_id;

        document.getElementById("faculty_name").textContent = auth_name;

        document.getElementById("email_id").textContent = auth_email_id;

        $("#dblp_id").attr("href",auth_dblp_id);
        document.getElementById("dblp_id").textContent = auth_dblp_id;
      }
    }
}




/*
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

*/



/*
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
*/
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
