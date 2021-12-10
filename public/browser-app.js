// const formDOM = document.querySelector('.form')
// const usernameInputDOM = document.querySelector('.username-input')
// const passwordInputDOM = document.querySelector('.password-input')
// const formAlertDOM = document.querySelector('.form-alert')
// const resultDOM = document.querySelector('.result')
// const btnDOM = document.querySelector('#data')
// const tokenDOM = document.querySelector('.token')


let authorArray = ['Narayanan C. Krishnan', 'R Nitin Auluck', 'Neeraj Goel', 'Deepti R. Bathula', 'Puneet Goyal', 'Balwinder Sodhi', 'Mukesh Saini', 'Ram Subramanian', 'Shashi Shekhar Jha','Sudarshan Iyengar', 'Sujata Pal', 'Shweta Jain', 'Sudeepta Mishra', 'Abhinav Dhall', 'Apurva Mudgal', 'T V Kalyan', 'Anil Shukla'];
let updatedArray = []
var name;

//R Nitin Auluck
//Ram Subramanian
//T V Kalyan

//INDEX FILE

const getname = async () => {
    //console.log("clicked");
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

        array_data[i]._pub = await getPublications(name);
      
      }
    }
    $('.profile-login').css('display','block');
    $('.boxed').css('display','block');
   
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
//for director page
const getauthors = async () => {
  let start_year = document.getElementById("start_year").value;
  let end_year = document.getElementById("end_year").value;
  let number_pub = document.getElementById("number_pub").value;
  //console.log("start year "+ start_year+" end year "+ end_year+" number pub "+ number_pub);

  const api = await fetch(`/api/V1/specifics?Syear=${start_year}&Eyear=${end_year}&publications=${number_pub}`);
  const api_data = await api.json();
  const array_data = api_data.result;
  console.log(array_data)

  //connecting to frontend
  
  /*making table*/
  
  res_buildTable()

    function res_buildTable() {
        var table = document.getElementById('res_myTable')
        table.innerHTML = ''
        for (var i = 0; i < array_data.length; i++) {
            var row = `<tr>
                        <td id="td">${array_data[i]._authName}</td>
                        <td>${array_data[i]._email}</td>
                        <td>${array_data[i]._dblp_id}</td>
                        <td>${array_data[i]._pub}</td>
                        </tr>`
            table.innerHTML += row;
            //console.log("pubs: ["+i+"]"+pubs[i]);
        }
    }
  
  
  
  
  
  
  
  
  
  
  //making containers available
  /*
  for(let i=0;i < array_data.length;i++){
    const makecontainer = () => {
      return `
      <div class="boxed-res">
          <section class="profile-res">
            <div class="container grid grid-cols-2 grid-profile">
              <div class="img-box">
                <img
                  src="IMG/user-img.png"
                  class="f-img"
                  alt="passport size faculty image"
                />
              </div>
              <div class="text-box">
                <h2 id="auth_name"class="secondary-heading f-name">${array_data[i]._authName}</h2>
                <p class="f-email">
                  <a id="auth_email_id" class="email-link" href="#"
                    >${array_data[i]._email}</a
                  >
                </p>
                <p class="dblp">
                  <a id="auth_dblp_id" class="dblp-link" href="${array_data[i]._dblp_id}">${array_data[0]._dblp_id}</a>
                </p>
              </div>
            </div>
          </section>
        </div>
      `;   
    };
    $('.container').append(makecontainer)
  }
  */
}


//fetching data and displaying it from dblp api
const getdata = async(name)=>{

  const resp =await fetch(`https://dblp.org/search/publ/api?q=${name}&format=json`)
  const respdata = await resp.json();
  const result = respdata.result.hits.hit;
    console.log("res"+result);
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
            console.log("pubs: ["+i+"]"+pubs[i]);
        }
    }

    //publication completed

    //co_author section 
    
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
    console.log('pubs: '+ pubs[0]);
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
    
}
getdata(name);
//GET YEAR FROM DBLP API

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


//GET PUBLICATION FROM DBLP API
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



//PROFILE BAR FOR faculty-proifle
const author = async(name)=>{
    console.log(name);
    //const result = await fetch(`/api/v1/author?name=${name}`)
    //const respdata = await result.json();
    //console.log(respdata);
    const api = await fetch("/api/v1/all")
    const api_data = await api.json();
    const array_data = api_data.result;
     //console.log(array_data); //working
    for(i in array_data)
    {
      if(array_data[i]._authName === name)
      {
        array_data[i]._year = await getyear(name);
        console.log("year fun: " +array_data[i]._year);
        array_data[i]._pub = await getPublications(name);
        console.log("deblp" + array_data[i]._dblp_id);
        //return 
        console.log(array_data[i]);
      }
    }

    //extract email,dblp id and name
    for(i in array_data){

      if(array_data[i]._authName === name)
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
console.log(name);
/*
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

getauth_name(name);

*/