var SiteName = document.getElementById('SiteName');
var SiteURL = document.getElementById('SiteURL');
var addBook = document.getElementById('addBook');
var invalid = document.getElementById('invalid');
var rules = document.getElementById('rules');
var search = document.getElementById('search');




var booksContainer;
var currentIndex;

// check if local storage empty or none
if(localStorage.getItem("bookmark") == null){
    booksContainer = [];
}else{
    booksContainer = JSON.parse(localStorage.getItem("bookmark"));
    display()
}

// check if url valid or none and check add data or update
addBook.onclick = function(){
        if(matchUrl() === true && addBook.innerHTML == 'Submit'){
            addBooks();
            invalid.classList.replace("d-block","d-none");
            rules.classList.replace("d-block","d-none")

        }else if(matchUrl() === false){
            invalid.classList.replace("d-none","d-block");
            rules.classList.replace("d-none","d-block");
        }else{
            saveBookmark()
        }

        localStorage.setItem("bookmark",JSON.stringify(booksContainer));
        display()
         clear()
    }

// add bookmark
function addBooks(){
    var books = {
        siteName: SiteName.value,
        siteUrl: SiteURL.value
    }
    booksContainer.push(books);
   
}


// display data
function display(){
    var content = '';
    for(var i=0; i<booksContainer.length;i++){
        
        content += `<tr>
        <td>${i+1}</td>
        <td>${booksContainer[i].siteName}</td>
        <td><a class="btn sub" href="${booksContainer[i].siteUrl}" target="_blank" ><i class="fa-regular fa-eye"></i> Visit</a></td>
        <td><a class="btn update" onClick="updateBookmark(${i});"><i class="fa-sharp fa-solid fa-pen-to-square"></i> Update</a></td>
        <td><a class="btn delete" onClick="deleteBookmark(${i});"><i class="fa-regular fa-trash-can"></i> Delete</a></td>

        </tr>`
   
    
}
    document.getElementById('tableBody').innerHTML=content;
}

// url validation
function matchUrl(){
    var regex1 = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/;
    if(regex1.test(SiteURL.value) === true){
        return true;
    }else{
        return false;
    }
}

// clear data from input after the add
function clear(){
    SiteName.value = "";
    SiteURL.value = "";
}

// delet bookmark from table
function deleteBookmark(index){
    booksContainer.splice(index,1);
    localStorage.setItem("bookmark",JSON.stringify(booksContainer));
    display()
}

// update bookmark
function updateBookmark(i){
    currentIndex = i;
    SiteName.value = booksContainer[i].siteName;
    SiteURL.value = booksContainer[i].siteUrl;
    addBook.innerHTML = "Update"
}

// save data after edit
function saveBookmark(){
    var books = {
        siteName: SiteName.value,
        siteUrl: SiteURL.value
    }
    booksContainer[currentIndex] = books;
    addBook.innerHTML = "Submit"

}

// search for bookmark
function searchBoomark(){
    var content = ``;
    for(var i=0; i<booksContainer.length; i++){
        if(booksContainer[i].siteName.includes(search.value)){
            if(search.value != ''){
                content += `<tr>
                <td>${i+1}</td>
                <td>${booksContainer[i].siteName.replace(search.value,`<mark>${search.value}</mark>`)}</td>
                <td><a class="btn sub" href="${booksContainer[i].siteUrl}" target="_blank" ><i class="fa-regular fa-eye"></i> Visit</a></td>
                <td><a class="btn update" onClick="updateBookmark(${i});"><i class="fa-sharp fa-solid fa-pen-to-square"></i> Update</a></td>
                <td><a class="btn delete" onClick="deleteBookmark(${i});"><i class="fa-regular fa-trash-can"></i> Delete</a></td>
        
                </tr>`
            }else{
                content += `<tr>
                <td>${i+1}</td>
                <td>${booksContainer[i].siteName}</td>
                <td><a class="btn sub" href="${booksContainer[i].siteUrl}" target="_blank" ><i class="fa-regular fa-eye"></i> Visit</a></td>
                <td><a class="btn update" onClick="updateBookmark(${i});"><i class="fa-sharp fa-solid fa-pen-to-square"></i> Update</a></td>
                <td><a class="btn delete" onClick="deleteBookmark(${i});"><i class="fa-regular fa-trash-can"></i> Delete</a></td>
        
                </tr>`
            }
        }
        document.getElementById('tableBody').innerHTML=content;
    }
}
