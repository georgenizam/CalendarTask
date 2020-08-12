let view = {  

  createEl: function ({tag, classes, attrs, innerHtml}) {    
    let el = document.createElement(tag);
    classes.forEach(function(item) {
      el.classList.add(item);
    });
    attrs.forEach(function(item) {
      el.setAttribute(item.name, item.value);  
    });    
    el.innerHTML = innerHtml;
    return el;
  },

  displayAddShortForm: function() {
    let elFrom = this.createEl({ tag: 'form', classes: ['add-form-mini'], attrs: [], innerHtml: '' });
    elFrom.appendChild(this.createEl({ tag: 'input', classes: ['all-event'], attrs: [{name: 'autocomplete', value: 'off'}, {name: 'placeholder', value: '17, Август, 2020, 14:32, Название, Описание'}], innerHtml: '' }));
    elFrom.appendChild(this.createEl({ tag: 'button', classes: ['btn-form-mini-add'], attrs: [], innerHtml: 'Создать' }));
    elFrom.appendChild(this.createEl({ tag: 'span', classes: ['add-form-mini-close'], attrs: [], innerHtml: `&times;` }));
    return elFrom;
  },

  closeAddShortForm: function() {
    let el = document.querySelector('.add-form-mini-wrap');    
    while(el.firstChild) {
      el.removeChild(el.firstChild);
    };
    el.style.cssText = 'display: none;';
  },

  displayEditForm: function({dayEl}) {    
    let formWrap = this.createEl({ tag: 'div', classes: ['edit-form-wrap'], attrs: [], innerHtml: '' });
    let form = this.createEl({ tag: 'form', classes: ['edit-form'], attrs: [], innerHtml: '' });
    form.appendChild(this.createEl({ tag: 'div', classes: [], attrs: [{name: 'id', value: 'btn-edit-form-close'}], innerHtml: '&times;' })); 
    form.appendChild(this.createEl({ tag: 'input', classes: ['name-event'], attrs: [{name: 'autocomplete', value: 'off'}, {name: 'placeholder', value: 'Событие'}], innerHtml: '' }));
    form.appendChild(this.createEl({ tag: 'input', classes: ['date-time'], attrs: [{name: 'date-time', value: `${dayEl.dataset.time}`}, {name: 'autocomplete', value: 'off'}, {name: 'placeholder', value: '17, Август, 2020, 14:32'}], innerHtml: '' }));    
    form.appendChild(this.createEl({ tag: 'input', classes: ['participants'], attrs: [{name: 'autocomplete', value: 'off'}, {name: 'placeholder', value: 'Имена участников'}], innerHtml: '' }));    
    form.appendChild(this.createEl({ tag: 'textarea', classes: [], attrs: [{name: 'placeholder', value: 'Описание'}], innerHtml: '' }));
    
    let actions = this.createEl({ tag: 'div', classes: ['actions'], attrs: [], innerHtml: '' });
    actions.appendChild(this.createEl({ tag: 'button', classes: ['btn-form-edit'], attrs: [], innerHtml: 'edit' }));
    actions.appendChild(this.createEl({ tag: 'button', classes: ['btn-form-clear'], attrs: [], innerHtml: 'clear' }));
    form.appendChild(actions);
    formWrap.append(form);

    this.formEditWrap = formWrap;
    
    
    formWrap.style.cssText = "display: block; left: 60px;";    
    
    dayEl.appendChild(formWrap);
    return formWrap;
  },

  displayInfoForm: function({dayEl}) {
    el = dayEl.querySelector('.day_descr');    
    let dayObj = {
      nameEvent: el.dataset.nameEvent,
      date: el.dataset.timeEvent,
      participants: el.dataset.participantsEvent,
      descrEvent: el.dataset.descrEvent
    }
    let date = new Date(+dayObj.date);    
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();          
    
    let dateString = `${day}.${month}.${year} ${hours}:${minutes}`;


    let formWrap = this.createEl({ tag: 'div', classes: ['info-form-wrap'], attrs: [], innerHtml: '' });
    let form = this.createEl({ tag: 'form', classes: ['info-form'], attrs: [], innerHtml: '' });
    form.appendChild(this.createEl({ tag: 'div', classes: [], attrs: [{name: 'id', value: 'btn-info-form-close'}], innerHtml: '&times;' })); 
    form.appendChild(this.createEl({ tag: 'p', classes: ['name-event'], attrs: [{name: 'data-name-event', value: `${dayObj.nameEvent}` }], innerHtml: `${dayObj.nameEvent}` }));
    form.appendChild(this.createEl({ tag: 'p', classes: ['date-time'], attrs: [{name: 'data-time-event', value: `${+dayObj.date}`}], innerHtml: `${dateString}` }));    
    form.appendChild(this.createEl({ tag: 'span', classes: [], attrs: [], innerHtml: `Участники:` }));        
    form.appendChild(this.createEl({ tag: 'p', classes: ['participants'], attrs: [{name: 'data-participants-event', value: `${dayObj.participants}` }], innerHtml: `${dayObj.participants}` }));    
    form.appendChild(this.createEl({ tag: 'textarea', classes: [], attrs: [{name: 'placeholder', value: 'Описание'}, {name: 'data-descr-event', value: `${dayObj.descrEvent}`}], innerHtml: `${dayObj.descrEvent}` }));
    
    let actions = this.createEl({ tag: 'div', classes: ['actions'], attrs: [], innerHtml: '' });
    actions.appendChild(this.createEl({ tag: 'button', classes: ['btn-form-edit'], attrs: [], innerHtml: 'edit' }));
    actions.appendChild(this.createEl({ tag: 'button', classes: ['btn-form-clear'], attrs: [], innerHtml: 'clear' }));
    form.appendChild(actions);
    formWrap.append(form);

    this.formEditWrap = formWrap;
    
    formWrap.style.cssText = "display: block; left: 60px;";    
    
    dayEl.appendChild(formWrap);
    return formWrap;
  },

  closeEditForm: function() {    
    let editFormEl = document.querySelector(".edit-form-wrap");
    if (editFormEl)
      editFormEl.parentNode.removeChild(editFormEl);
  },

  closeInfoForm: function() {    
    let infoFormEl = document.querySelector(".info-form-wrap");
    if (infoFormEl)
      infoFormEl.parentNode.removeChild(infoFormEl);
  },

  rowItem: function({startDate, events, callBack, weekdays}) {
    let weekdaysList = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    let elRow = this.createEl({ tag: 'tr', classes: [], attrs: [], innerHtml: '' });
    let dayObj = {
      number: "",      
      weekdayName: "",
      event: "",
      time: "", 
      callBack: callBack
    };
  
    for (let i=0; i<7; i++) {
      let date = new Date(startDate + i * 1000*60*60*24);

      for (item in events) {
        let startDayTime = startDate + i * 1000*60*60*24;
        let nextDayTime = startDate + (i+1) * 1000*60*60*24;

        if ( (events[item].dateEvent >= startDayTime) && (events[item].dateEvent < nextDayTime) ) {
          dayObj.event = events[item];
          break;
        }
        else {
          dayObj.event = {dateEvent: "", descrEvent: "", nameEvent: "", participantsEvent: [] };
        }
      }
      
      dayObj.number = date.getDate();
      dayObj.weekdayName = weekdays ? weekdaysList[i] : "";      
      dayObj.time = Date.parse(date);
      let day = this.dayItem(dayObj); 
      elRow.appendChild(day);
    }
    return elRow;
  },

  dayItem: function({number, weekdayName ,event, time, callBack}) {
    let weekday = weekdayName !== "" ? weekdayName + ", " : ""; 
    let participants = (event.participantsEvent).join(', ');
    let htmlContentElement = `                
      <p class="day_number">${weekday}${number}</p>
      <p class="day_descr" data-time-event="${event.dateEvent}" data-name-event="${event.nameEvent}" data-participants-event="${participants}" data-descr-event="${event.descrEvent}">
        <span class="event-name">${event.nameEvent}</span>
        <span class="event-participants">${participants}</span>
      </p>
    `;
    let elObj = {
      tag: 'td',
      classes: [],
      attrs: [{name: 'data-time', value: time}],
      innerHtml: htmlContentElement
    }        
    let elDay = this.createEl(elObj);
    elDay.onclick = callBack;

    if (event.descrEvent !== '' || event.nameEvent !== '') {        
      elDay.classList.toggle('event-active');         
    }    
    return elDay;
  },

  searchItem: function({eventObj, callBack}) {
    let date = new Date(eventObj.dateEvent);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();          
    let htmlContentElement = `   
    <p class="event-name">${eventObj.nameEvent}</p>
    <p class="event-date">${day}.${month}.${year} - ${hours}:${minutes}</p>    
    `;
    let elObj = {
      tag: 'div',
      classes: ['item'],
      attrs: [{name: 'data-time-search', value: date.setHours(0, 0, 0, 0)}],
      innerHtml: htmlContentElement
    }  
    let itemEl = this.createEl(elObj);    
    itemEl.onclick = callBack;
    return itemEl;
  },

  updateDayItem: function(obj) {    
    let date = new Date(obj.dateEvent);
    let el = document.querySelector(`[data-time="${date.setHours(0, 0, 0, 0)}"]`);
    if (el) {
      let dayDescrEl = el.querySelector('.day_descr');
      let participants = obj.participantsEvent.join(', ')
      dayDescrEl.dataset.timeEvent = obj.dateEvent;
      dayDescrEl.dataset.nameEvent = obj.nameEvent;
      dayDescrEl.dataset.participantsEvent = participants;
      dayDescrEl.dataset.descrEvent = obj.descrEvent;
      
      let htmlContentElement = `        
        <span class="event-name">${obj.nameEvent}</span>
        <span class="event-participants">${participants}</span>        
      `;
      dayDescrEl.innerHTML = htmlContentElement;
      
      if (obj.descrEvent !== '' || obj.nameEvent !== '') {        
        if ( !((dayDescrEl.parentNode).classList.contains('event-active')) ) {
          (dayDescrEl.parentNode).classList.toggle('event-active');
        }          
      }
        
      else
        (dayDescrEl.parentNode).classList.toggle('event-active'); 
    }    
  },  

  monthItem: function({month, dateCur, events, callBackForDay}) {   
    let elMonth = this.createEl({ tag: 'table', classes: [], attrs: [], innerHtml: '' }); 
    let date = new Date(dateCur);
    let dateStartMonth = new Date(`${date.getFullYear()} ${date.getMonth() + 1} 1`);    
    let dateStartRow, weekdaysFlag;
    for (let i=0; i<5; i++) {      
      if (i === 0) {
        let amoundDayPrev = dateStartMonth.getDay() == 0 ? 6 : dateStartMonth.getDay() - 1 ;        
        dateStartRow = Date.parse(dateStartMonth) - (amoundDayPrev * 1000 * 60 * 60 * 24);          
        weekdaysFlag = true;
      }
      else {        
        dateStartRow += 7 * 1000 * 60 * 60 * 24;
        weekdaysFlag = false;
      }            
      let elRow = this.rowItem({startDate: dateStartRow, events: events, callBack: callBackForDay, weekdays: weekdaysFlag});
      elMonth.appendChild(elRow);
    }
    return elMonth;
  },

  displayResultsSearch: function(arrayEvents, callBack) {

    let resultsElWrap = document.querySelector('.search-result-wrap');
    while(resultsElWrap.firstChild) {
      resultsElWrap.removeChild(resultsElWrap.firstChild);
    };
    let resultsEl = this.createEl({tag: 'div', classes: ['search-result'], attrs: [], innerHtml: ''});

    resultsElWrap.appendChild(resultsEl);
    
    arrayEvents.forEach(function(item) {      
      let elSearch = view.searchItem({eventObj: item, callBack: callBack});
      resultsEl.appendChild(elSearch);
    });
  },

  closeResultsSearch: function() {
    let elDel = document.querySelector('.search-result');    
    if (elDel) {      
      elDel.parentNode.removeChild(elDel);
    }
  },
  
	displayCalendar: function({dateCur, events, month, callBackForDay} = {}){
    let calendar = document.getElementById('calendarId');
    while(calendar.firstChild) {
      calendar.removeChild(calendar.firstChild);
    }
    let monthEl = this.monthItem({month: month, dateCur: dateCur, events: events, callBackForDay: callBackForDay });
    calendar.append(monthEl); 

	},
};

let model = {

  date: 0,
  dateCalendarNow: 0,  

  months: [ 
    { nameMonth: 'Январь', amountDays: 31 }, 
    { nameMonth: 'Февраль', amountDays: 28} , 
    { nameMonth: 'Март', amountDays: 31 }, 
    { nameMonth: 'Апрель', amountDays: 30 }, 
    { nameMonth: 'Май', amountDays: 31 }, 
    { nameMonth: 'Июнь', amountDays: 30 }, 
    { nameMonth: 'Июль', amountDays: 31 }, 
    { nameMonth: 'Август', amountDays: 31 }, 
    { nameMonth: 'Сентябрь', amountDays: 30 }, 
    { nameMonth: 'Октябрь', amountDays: 31 }, 
    { nameMonth: 'Ноябрь', amountDays: 30 }, 
    { nameMonth: 'Декабрь', amountDays: 31 } ],

  events: [],

  initEvents: function() {

    let eventsTmp = [       
      {  
        nameEvent: "testEvent11",
        dateEvent: 1597352450000,
        participantsEvent: ['Костя', 'Вова', 'Володя', 'Михаил'],
        descrEvent: "description event1"                   
      },
      {  
        nameEvent: "testEvent22",
        dateEvent: 1597009930000,
        participantsEvent: ['Костя', 'Вова', 'Володя', 'Миша'],
        descrEvent: "description event2"                   
      },
      {  
        nameEvent: "testEvent33",
        dateEvent: 1599019930000,
        participantsEvent: ['Коля'],
        descrEvent: "description event2"                   
      }
    ];
    
    if (!localStorage.events) {
      localStorage.events = JSON.stringify(eventsTmp) || '[]';
      this.events = eventsTmp;
      return;
    }

    let objsLocalStorage = JSON.parse(localStorage.events)
    
    let arrayKeysEtalon = Object.keys(eventsTmp[0]);
    for (item in objsLocalStorage) {
      let arrayKeys = Object.keys(objsLocalStorage[item]);
      if (arrayKeysEtalon.length !== arrayKeys.length) {
        localStorage.clear();
        localStorage.events = JSON.stringify(eventsTmp) || '[]';
        this.events = eventsTmp;        
        break;
      }
      else {
        let flagOut = false;
        for (itemKey in arrayKeysEtalon) {
          if (arrayKeysEtalon[itemKey] !== arrayKeys[itemKey]) {
            flagOut = true;
            break;
          }
        }
        if (flagOut) {
          localStorage.clear();
          localStorage.events = JSON.stringify(eventsTmp) || '[]';
          this.events = eventsTmp;
          break;
        }
        else {
          this.events = objsLocalStorage;
        }
      }      
    }
  },

  search: function(str) { 
    if (str === '') {
      return [];
    }
    let date = new Date(this.dateCalendarNow);
    date.setMonth(date.getMonth() + 1);
    let dateMonthStart = this.dateCalendarNow;
    let dateMonthEnd = Date.parse(date);
    let results;
    let topResults = [];
    let bottomResults = []
    for (item in this.events) {
      if (this.events[item].nameEvent.includes(str)) {
        if (dateMonthStart <= this.events[item].dateEvent && dateMonthEnd > this.events[item].dateEvent) {
          topResults.push(this.events[item]);
        }
        else {
          bottomResults.push(this.events[item]);
        }
        continue;
      }
      else if (this.events[item].participantsEvent.includes(str)) {
        if (dateMonthStart <= this.events[item].dateEvent && dateMonthEnd > this.events[item].dateEvent) {
          topResults.push(this.events[item]);
        }
        else {
          bottomResults.push(this.events[item]);
        }
        continue;
      }

    }
    results = topResults.concat(bottomResults);
    return results;
  },

  addEvent: function(obj) {
    const index = this.events.findIndex(item => JSON.stringify(item) === JSON.stringify(obj))
    if (index === -1) {
      this.events.push(obj);     
    }    
    this.sortEvents();
    localStorage.events = JSON.stringify(this.events) || '[]';
    return true;
  },

  deleteEvent: function(obj) {
    const index = this.events.findIndex(item => JSON.stringify(item) === JSON.stringify(obj))
    if (index !== -1) {
      this.events.splice(index, 1);
    }
    this.sortEvents();    
    localStorage.events = JSON.stringify(this.events) || '[]';
  },

  changeEvent: function(oldObj, newObj) {
    const index = this.events.findIndex(item => JSON.stringify(item) === JSON.stringify(oldObj));    
    if (index !== -1) {
      this.events[index] = newObj;
    }     
    this.sortEvents();
    localStorage.events = JSON.stringify(this.events) || '[]';
  },

  sortEvents: function() {
    this.events.sort((a, b) => a.dateEvent > b.dateEvent ? 1 : -1);
  },

  isLeapYear: function(year) {
    return (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0));
  },


  generateCalendar: function({nextMonth, prevMonth, toDate, date ,callBackForDay}) {        
    this.initEvents();

    if (!nextMonth && !prevMonth && !toDate) {      
      this.date = Date.now();

      let dateCalend = new Date();
      dateCalend.setDate(1);
      dateCalend.setHours(0,0,0,0);
      this.dateCalendarNow = Date.parse(dateCalend);

      let dateObj = new Date(this.date);
      let year = dateObj.getFullYear();
      if (this.isLeapYear(year)) {
        this.months[1].amountDays = 29;
      }

      return {
        dateCur: this.date,
        month: this.months[dateObj.getMonth()],
        events: this.events,
        callBackForDay: callBackForDay
      };
    }
        

    if (nextMonth) {
      let dateNowObj = new Date(this.dateCalendarNow);
      dateNowObj.setMonth(dateNowObj.getMonth() + 1);
      this.dateCalendarNow = Date.parse(dateNowObj);
      return {
        dateCur: this.dateCalendarNow,
        month: this.months[dateNowObj.getMonth()],
        events: this.events,
        callBackForDay: callBackForDay
      };
    }
    if (prevMonth) {
      let dateNowObj = new Date(this.dateCalendarNow);
      dateNowObj.setMonth(dateNowObj.getMonth() - 1);
      this.dateCalendarNow = Date.parse(dateNowObj);
      return {
        dateCur: this.dateCalendarNow,
        month: this.months[dateNowObj.getMonth()],
        events: this.events,
        callBackForDay: callBackForDay
      };
    }

    if (toDate) {      
      this.dateCalendarNow = +date;      
      let dateNowObj = new Date(this.dateCalendarNow);
      this.dateCalendarNow = Date.parse(dateNowObj);
      return {
        dateCur: this.dateCalendarNow,
        month: this.months[dateNowObj.getMonth()],
        events: this.events,
        callBackForDay: callBackForDay
      };
    } 
  }
};


let controller = {
  
  oldObjectEvent: {},  
  formEdit: {elemName: "", open: false},
  formInfo: {elemName: "", open: false},

  clickOnDay: function() {
    el = this.querySelector('.day_descr');
    let dayObj = {
      nameEvent: el.dataset.nameEvent,
      date: el.dataset.timeEvent,
      participants: el.dataset.participantsEvent,
      descrEvent: el.dataset.descrEvent,
      dayEl: this
    }

    let editFormFlag = false;
    let infoFormFlag = false;
    for (key in dayObj) {
      if (dayObj[key] == "" || dayObj == null) {
        editFormFlag = true;
        infoFormFlag = false;
        break;
      }
      else {
        editFormFlag = false;
        infoFormFlag = true;
      }
    }
    
    if (editFormFlag) {
      if (controller.formEdit.open && controller.formEdit.elemName !== this) {                
        controller.generateFormEdit({open: true, obj: this});        
      } 
      else if (!controller.formEdit.open && controller.formEdit.elemName !== this){
        controller.generateFormEdit({open: false, obj: this});        
      }
    }

    if (infoFormFlag) {
      if (controller.formInfo.open && controller.formInfo.elemName !== this) {                
        controller.generateFormInfo({open: true, obj: this});       
      } 
      else if (!controller.formInfo.open && controller.formInfo.elemName !== this){
        controller.generateFormInfo({open: false, obj: this});        
      }     
    }    
  },

  generateFormEdit({open, obj}) {
    if (open) {
      view.closeEditForm();
      controller.formEdit.open = false;      
    } 

    view.displayEditForm({dayEl: obj});        
    controller.formEdit.open = obj;
    controller.formEdit.elemName = obj;

    if (controller.formInfo.elemName !== '') {
      controller.btnFormInfoCloseClick();
    }

    let closeBtnFormEdit = document.getElementById('btn-edit-form-close');
    closeBtnFormEdit.onclick = controller.btnFormEditCloseClick.bind(controller);
    
    let btnFormEdit = document.getElementsByClassName('btn-form-edit')[0];
    btnFormEdit.onclick = controller.btnFormEditClick.bind(controller);

    let btnFormEditClear = document.getElementsByClassName('btn-form-clear')[0];
    btnFormEditClear.onclick = controller.btnFormEditClearClick.bind(controller);
  },

  generateFormInfo({open, obj}) {
    if (open) {
      view.closeInfoForm();
      controller.formInfo.open = false;
    }
    view.displayInfoForm({dayEl: obj});        
    controller.formInfo.open = true;
    controller.formInfo.elemName = obj;

    if (controller.formEdit.elemName !== '') {
      controller.btnFormEditCloseClick();
    }

    let closeBtnFormInfo = document.getElementById('btn-info-form-close');
    closeBtnFormInfo.onclick = controller.btnFormInfoCloseClick.bind(controller);
    
    let btnFormInfo = document.getElementsByClassName('btn-form-edit')[0];
    btnFormInfo.onclick = controller.btnFormInfoEditClick.bind(controller);

    let btnFormInfoClear = document.getElementsByClassName('btn-form-clear')[0];
    btnFormInfoClear.onclick = controller.btnFormInfoClearClick.bind(controller);
  },

  btnFormInfoCloseClick: function() {
    let editFormEl = document.querySelector(".info-form-wrap");
    if (editFormEl) {
      editFormEl.parentNode.removeChild(editFormEl);      
      
      setTimeout(function() {
        controller.formInfo.open = false;
        controller.formInfo.elemName = '';
      }, 10);
         
    }    
  },

  btnFormInfoEditClick: function (e) {
    e.preventDefault();    
    let formEl = document.querySelector('.info-form');
    let descrEvent = formEl.getElementsByTagName('textarea')[0].value;
    let oldDescrEvent = formEl.getElementsByTagName('textarea')[0].dataset.descrEvent;
    if (descrEvent.trim() !== '') {           
      let nameEvent = formEl.querySelector('.name-event').dataset.nameEvent;
      let time = +formEl.querySelector('.date-time').dataset.timeEvent;    
      let participants = formEl.querySelector('.participants').dataset.participantsEvent;      
      
      let participantsArray = participants.split(',').map(item => item.trim());

      let oldObjectEvent = {
        nameEvent: nameEvent,
        dateEvent: time,
        participantsEvent: participantsArray,
        descrEvent: oldDescrEvent        
      }

      let newObjectEvent = {    
        nameEvent: nameEvent,
        dateEvent: time,
        participantsEvent: participantsArray,
        descrEvent: descrEvent        
      }      

      model.changeEvent(oldObjectEvent ,newObjectEvent);
      view.updateDayItem(newObjectEvent);
      this.btnFormInfoCloseClick();
            
    }
    else {
      alert("проверьте введенные данные");
    }
  },

  btnFormInfoClearClick: function (e) {
    e.preventDefault();
    let formEl = document.querySelector('.info-form');    
    let oldDescrEvent = formEl.getElementsByTagName('textarea')[0].dataset.descrEvent;
    
    let nameEvent = formEl.querySelector('.name-event').dataset.nameEvent;
    let time = +formEl.querySelector('.date-time').dataset.timeEvent;    
    let participants = formEl.querySelector('.participants').dataset.participantsEvent;      
    
    let participantsArray = participants.split(',').map(item => item.trim());
    
    let oldObjectEvent = {
      nameEvent: nameEvent,
      dateEvent: time,
      participantsEvent: participantsArray,
      descrEvent: oldDescrEvent        
    }

    let newObjectEvent = {    
      nameEvent: '',
      dateEvent: time,
      participantsEvent: [],
      descrEvent: ''
    }    

    model.deleteEvent(oldObjectEvent);    
    this.btnFormInfoCloseClick();
    view.updateDayItem(newObjectEvent);
  },

  btnFormEditCloseClick: function() {
    
    let editFormEl = document.querySelector(".edit-form-wrap");
    if (editFormEl) {
      editFormEl.parentNode.removeChild(editFormEl);      
      setTimeout(function() {
        controller.formEdit.open = false;
        controller.formEdit.elemName = '';
      }, 10);
    }
  },

  btnFormEditClick: function (e) {
    e.preventDefault();    
    let nameEvent = document.getElementsByClassName('name-event')[0].value;
    let time = document.getElementsByClassName('date-time')[0].value;    
    let participants = document.getElementsByClassName('participants')[0].value;    
    let descrEvent = document.getElementsByTagName('textarea')[0].value;
    let timeObj = this.checkTime(time);
    if (nameEvent.trim() !== '' && descrEvent.trim() !== '' && participants.trim() !== '' && timeObj) {            
    
      let participantsArray = participants.split(',').map(item => item.trim());
      let newObjectEvent = {    
        nameEvent: nameEvent,
        dateEvent: Date.parse(timeObj),
        participantsEvent: participantsArray,
        descrEvent: descrEvent        
      }      
      model.addEvent(newObjectEvent);      
      view.updateDayItem(newObjectEvent);
      this.btnFormEditCloseClick();      
        
    }
    else {
      alert("проверьте введенные данные");
    }
  },

  btnFormEditClearClick: function (e) {
    e.preventDefault();
    let nameEvent = document.getElementsByClassName('name-event')[0].value = '';
    let time = document.getElementsByClassName('date-time')[0].value = '';    
    let participants = document.getElementsByClassName('participants')[0].value = '';    
    let descrEvent = document.getElementsByTagName('textarea')[0].value = '';    
  },
  
  checkTime: function(str) {    
    let arrDate = str.split(',').map(item => item.trim());
    if (arrDate.length !== 4)
      return;

    let dateObj = new Date();
    
    let dayFlag = false;
    let monthFlag = false;
    let yearFlag = false;
    let timeFlag = false;

    for (item in model.months) {
      if (model.months[item].nameMonth === arrDate[1]) {
        monthFlag = true;        
        dateObj.setMonth(item);
        if (Number.isInteger(+arrDate[0]) && +arrDate[0] <= model.months[item].amountDays && +arrDate[0] > 0) {
          dayFlag = true;
          dateObj.setDate(arrDate[0]);
        }          
        break;
      };
    }
    if (+arrDate[2] >= 1970) {
      yearFlag = true;
      dateObj.setFullYear(arrDate[2]);
    }
      
    else 
      yearFlag = false;

    let timeArr = arrDate[3].split(':').map(item => item.trim());
    if (!Number.isInteger(+timeArr[0]) || !Number.isInteger(+timeArr[0]))
      timeFlag = false;
    else {
      let hours = +timeArr[0];
      let minutes = +timeArr[1];
      if (hours < 24 && hours >= 0 && minutes >= 0 && minutes < 60) {
        timeFlag = true;
        dateObj.setHours(hours, minutes, 0, 0);
      }        
      else 
        timeFlag = false;
    }   
    
    if (dayFlag && monthFlag && yearFlag && timeFlag)      
      return dateObj;
    else return;    
  },


  prevBtnMonthClick: function() {    
    let m = model.generateCalendar({nextMonth: false, prevMonth: true, callBackForDay: controller.clickOnDay});
    let monthButtons = document.querySelector('.controls-date');
    let spanEl = monthButtons.getElementsByTagName('span')[0];
    let date = new Date(m.dateCur);
    spanEl.innerHTML = `${m.month.nameMonth} ${date.getFullYear()}`;
    view.displayCalendar(m);
  },

  nextBtnMonthClick: function() {    
    let m = model.generateCalendar({nextMonth: true, prevMonth: false, callBackForDay: controller.clickOnDay});
    let monthButtons = document.querySelector('.controls-date');
    let spanEl = monthButtons.getElementsByTagName('span')[0];
    let date = new Date(m.dateCur);
    spanEl.innerHTML = `${m.month.nameMonth} ${date.getFullYear()}`;    
    view.displayCalendar(m);      
  },

  todayBtnMonthClick: function() {
    let m = model.generateCalendar({nextMonth: false, prevMonth: false, callBackForDay: controller.clickOnDay});
    let monthButtons = document.querySelector('.controls-date');
    let spanEl = monthButtons.getElementsByTagName('span')[0];
    let date = new Date(m.dateCur);
    spanEl.innerHTML = `${m.month.nameMonth} ${date.getFullYear()}`;    
    view.displayCalendar(m);   
    
    let dateToday = new Date(m.dateCur);
    let el = document.querySelector(`[data-time="${dateToday.setHours(0, 0, 0, 0)}"]`);
    if (el) {
      el.classList.toggle('active');
      setTimeout(function() {
        el.classList.toggle('active');
      }, 1500);
    }
  },

  searchInputChanged: function(e) {
    let searchInput = document.querySelector('#search');
    
    let resultsSearch = model.search(searchInput.value);
    view.displayResultsSearch(resultsSearch, controller.searchResultItemClick);

    document.body.onclick = function(e) {                        
      if ( !(e.target).closest('.search') ) {    
        view.closeResultsSearch();
      
      }      
    }
  },

  clearSearchInputClick: function() {
    let searchInput = document.querySelector('#search');
    searchInput.value = '';
    view.closeResultsSearch();
  },

  searchResultItemClick: function() {
    let dateItem = this.dataset.timeSearch;
    let el = document.querySelector(`[data-time="${dateItem}"]`);
    if (el) {      
      el.classList.toggle('active');
      setTimeout(function() {
        el.classList.toggle('active');
      }, 1500);
    }      
    else {
      let date2 = new Date(dateItem);
      date2.setDate(1);
      
      let m = model.generateCalendar({nextMonth: false, prevMonth: false, toDate: true, date: dateItem, callBackForDay: controller.clickOnDay});
      let monthButtons = document.querySelector('.controls-date');
      let spanEl = monthButtons.getElementsByTagName('span')[0];
      let date = new Date(m.dateCur);
      spanEl.innerHTML = `${m.month.nameMonth} ${date.getFullYear()}`;
      view.displayCalendar(m);  

      let el2 = document.querySelector(`[data-time="${dateItem}"]`);
      if (el2) {
        el2.classList.toggle('active');
        setTimeout(function() {
          el2.classList.toggle('active');
        }, 1500);
      }  
    }
      
  },

  updateBtnClick: function() {
    location.reload();
  },

  addBtnClick: function(e) {
    let addBtnWrap = document.querySelector('.add-form-mini-wrap');
    addBtnWrap.style.cssText = 'display: block;';
    addBtnWrap.appendChild(view.displayAddShortForm());
    let closeAddShortForm = addBtnWrap.querySelector('.add-form-mini-close');
    closeAddShortForm.onclick = view.closeAddShortForm;

    document.body.onclick = function(e) {                        
      if (!(e.target).closest('.actions')) {        
        view.closeAddShortForm();        
      }      
    };

    let btnFormMiniAdd = addBtnWrap.querySelector('.btn-form-mini-add');
    btnFormMiniAdd.onclick = controller.btnFormMiniAddClick;
  },

  btnFormMiniAddClick: function(e) {
    e.preventDefault();
    let inputEl = document.querySelector('.all-event');
    let arrayParamsEvent = inputEl.value.split(',').map(item => item.trim());
    let nameEvent = arrayParamsEvent[4];
    let time = `${arrayParamsEvent[0]}, ${arrayParamsEvent[1]}, ${arrayParamsEvent[2]}, ${arrayParamsEvent[3]}`;
    let participants = 'no participants'
    let descrEvent = arrayParamsEvent[5];
    let timeObj = controller.checkTime(time);
    if (nameEvent.trim() !== '' && descrEvent.trim() !== '' && participants.trim() !== '' && timeObj) {            
      
      let participantsArray = participants.split(',').map(item => item.trim());
      let newObjectEvent = {    
        nameEvent: nameEvent,
        dateEvent: Date.parse(timeObj),
        participantsEvent: participantsArray,
        descrEvent: descrEvent        
      }      
      model.addEvent(newObjectEvent);
      view.updateDayItem(newObjectEvent);
      view.closeAddShortForm();       
    }
  },

  initCalendar() {
    let m = model.generateCalendar({nextMonth: false, prevMonth: false, callBackForDay: controller.clickOnDay});
    let monthButtons = document.querySelector('.controls-date');
    let spanEl = monthButtons.getElementsByTagName('span')[0];
    let date = new Date(m.dateCur);
    spanEl.innerHTML = `${m.month.nameMonth} ${date.getFullYear()}`;    
    view.displayCalendar(m);      
  }
};


let start = {

  init: function () {
    start.control();
    start.event();
  },		
    
  control: function () {      
    controller.initCalendar();
  },		
  event: function () {
    let prevBtn = document.querySelector('.prevBtn');
    prevBtn.onclick = controller.prevBtnMonthClick;

    let nextBtn = document.querySelector('.nextBtn');
    nextBtn.onclick = controller.nextBtnMonthClick;

    let todayBtn = document.querySelector('.todayBtn');
    todayBtn.onclick = controller.todayBtnMonthClick;

    let searchInput = document.querySelector('#search');
    searchInput.oninput = controller.searchInputChanged;

    let clearSearchInput = document.querySelector('.close-search');
    clearSearchInput.onclick = controller.clearSearchInputClick;

    let updateBtn = document.getElementById('updateBtn');
    updateBtn.onclick = controller.updateBtnClick;

    let addBtn = document.getElementById('addBtn');
    addBtn.onclick = controller.addBtnClick;
    
  }
      
};
  

window.onload = start.init;