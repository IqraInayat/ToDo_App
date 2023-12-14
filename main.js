let form= document.getElementById('form');
let error= document.getElementById('todoerror');
let utag=document.getElementById('items');
form.addEventListener('submit',function(event) 
{
    event.preventDefault();
    let todoel=document.getElementById('input');
    let todo= todoel.value;

    if(todo=="")
    {
        error.innerHTML="Enter todo list first..";
        todoel.classList.add('is-invalid');
    }
    else
    {
        addlist(todo);
        error.innerHTML="";
        todoel.classList.remove('is-invalid');
    }
});
function addlist(todo) 
{
    let array=[];
    if (sessionStorage.getItem('todo')) 
    {
        let storagedata=sessionStorage.getItem('todo');
        let splitdata=storagedata.split(',');
        array.push(splitdata,todo);
        sessionStorage.setItem('todo',array);
    } 
    else 
    {
        array.push(todo);
        sessionStorage.setItem('todo',array);
    }
    document.getElementById('input').value="";
    showdata();
}
showdata();

function showdata()
{
    utag.innerHTML="";
    if (sessionStorage.getItem('todo')) 
    {
        let storagedata=sessionStorage.getItem('todo');
        let splitdata=storagedata.split(',');

        for (let index = 0; index<splitdata.length; index++) 
        {
            let litags=document.createElement('li');
            litags.classList.add('liitems');
            const element = splitdata[index];
            litags.append(element);
            utag.prepend(litags);
        }
    } 
}
removedata();
function removedata() 
{
    let lidata=document.querySelectorAll('.liitems');
    if (sessionStorage.getItem('todo')) 
    {
        let storagedata=sessionStorage.getItem('todo');
        let splitdata=storagedata.split(',');
        for (let index = 0; index < lidata.length; index++) 
        {
            lidata[index].addEventListener('click',function () 
            {
                this.remove();
                removingsession(this.innerHTML,splitdata);
            });
        }
    }
}

function  removingsession(itemclick,splitarray) 
{
    for (let index = 0; index < splitarray.length; index++) 
    {
       if(itemclick==splitarray[index])
       {
        splitarray.splice(index,1);
       } 
       sessionStorage.setItem('todo',splitarray);
    }
}
