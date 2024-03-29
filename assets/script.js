const $timeBlocks = document.querySelector('.time-blocks')
const $currentDate = document.querySelector('#currentDate')
//localStorage.clear()

$(function () {

  // dayJs variables
  const day= dayjs().format('dddd') 
  const month= dayjs().format('MMMM')
  const year =  dayjs().format('YYYY')
  const hour = dayjs().format('H') 
  const date = `${day}, ${month} ${dayjs().format('D')}`
  
 
  // day object
  const dayObj = {
    date: date,
    hours: [
      ['9AM', null],
      ['10AM', null],
      ['11AM', null],
      ['12PM', null],
      ['1PM', null],
      ['2PM', null],
      ['3PM', null],
      ['4PM', null],
      ['5PM', null]
    ],
  }
  
  // sets local storage with basic day obj if its a new date or if there isn't local storage set
  // if(  getLocalStorage &&getParsedLocalStorage.date != date || !getLocalStorage ){
  //   localStorage.setItem('events',JSON.stringify(dayObj))
  // }else{
  //  eventsStorage= JSON.parse(localStorage.getItem('events'))
  // }
  
  // assigns colors to appropriate time block
  function renderTimeLineColors( id, el){
    const isPast = parseFloat(hour)> id
    const isCurrent = parseFloat(hour) === id
    if(isPast){
      el.classList.add('past') 
      el.classList.remove('present')
      el.classList.remove('future')
    }else if(isCurrent){
      el.classList.add('present') 
      el.classList.remove('past')
      el.classList.remove('future')
    }else{
      el.classList.add('future') 
      el.classList.remove('past')
      el.classList.remove('present')
    }
  }
  // saves inputs to storage
  function saveToLocalStorage(tBlockID,input){  
   const arr = JSON.parse(localStorage.getItem('events'))
    arr.hours[tBlockID - 9][1] = input.value
    localStorage.setItem('events', JSON.stringify(arr)) 
  } 
  
  
  // renders the scheduler HTML
  function renderTimeBlocks(){
   let getLocalStorage =localStorage.getItem('events')   
    let hourID = 9
    let array;     
    if(!getLocalStorage){
      localStorage.setItem('events', JSON.stringify(dayObj))
      getLocalStorage = localStorage.getItem('events')
      // sets date in DOM  
    }
    $currentDate.innerText =JSON.parse(localStorage.getItem('events')).date
  array = JSON.parse(localStorage.getItem('events')).hours
  
  for(let i = 0 ; i < array.length; i++){
    let hourDisplayed = array[i][0] 
   
    const $div = document.createElement('div')
    let input

    if(array[i][1]!== null){
      input = array[i][1]
    }else{
        input = ''
      }
      $div.id= hourID
      $div.className = "row time-block"
      $div.innerHTML=  `
      <div class="col-2 col-md-1 hour text-center py-3">${hourDisplayed}</div>
      <textarea  class="col-8 col-md-10 description" rows="3">${input} </textarea>
      <button class="btn saveBtn col-2 col-md-1 clicked" aria-label="save">
      <i class="fas fa-save " aria-hidden="true"></i>
      </button>
      `
      
      renderTimeLineColors(hourID++, $div)      
      $timeBlocks.append($div)

      // saves each input to appropriate field
      function handleSave(e){
        e.preventDefault()
        let $textArea;
        let $timeBlockID

        if(e.target.tagName === 'BUTTON'){
          $textArea = e.target.previousElementSibling
          $timeBlockID = $textArea.parentElement.id
          saveToLocalStorage($timeBlockID, $textArea)
        }else if(e.target.tagName === 'I'){
          $textArea = e.target.parentElement.previousElementSibling      
          $timeBlockID = $textArea.parentElement.id
          saveToLocalStorage($timeBlockID, $textArea)
        }      
      }
    }

    $timeBlocks.addEventListener('click', handleSave)
  }

  


renderTimeBlocks()
});
