const prevButton = document.querySelector(".btn-prev"),
    nextButton = document.querySelector(".btn-next"),
    dateText = document.querySelector(".date"),
    searchButton = document.querySelector(".btn-search"),
    todayButton = document.querySelector(".btn-today"),
    daysContainer = document.querySelector(".days"),
    dateInput = document.querySelector(".input-date"),
    dateTitle = document.querySelector(".todo-date>h1"),
    dateSubtitle = document.querySelector(".todo-date>h3"),
    eventsContainer = document.querySelector(".events");

let today = new Date(),
    selectedDay = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();
    

const months = ["Ocak", "Subat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", 
    "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

const weekdays = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]

const eventsArray = [
    {
        day: 2,
        month: 4,
        year: 2023,
        events: [
            {
                title: "Event adı",
                time: "10:00",
                isComplete: false
            },
            {
                title: "Event adı",
                time: "11:00",
                isComplete: false
            }
        ]
    },
    {
        day: 12,
        month: 5,
        year: 2023,
        events: [
            {
                title: "Event adı",
                time: "10:00",
                isComplete: true
            },
            {
                title: "Event adı",
                time: "11:00",
                isComplete: false
            }
        ]
    },
    {
        day: 15,
        month: 5,
        year: 2023,
        events: [
            {
                title: "Event adı",
                time: "10:00",
                isComplete: false
            },
            {
                title: "Event adı",
                time: "11:00",
                isComplete: false
            }
        ]
    },
    {
        day: 25,
        month: 5,
        year: 2023,
        events: [
            {
                title: "Event adı",
                time: "10:00",
                isComplete: false
            },
            {
                title: "Event adı",
                time: "11:00",
                isComplete: false
            }
        ]
    }
];

function initCalendar(){
    const firstDay = new Date(year, month, 0);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay();
    
    dateText.textContent = `${months[month]} ${year}`;

    let days = "";

    for(let x = day; x > 0; x--){
        days += `<div class="day prev-month" >${prevDays - x + 1}</div>`;
    }

    for(let i = 1; i <= lastDate; i++){

        let event = false;
                eventsArray.forEach((eventObject) => {
                    if(i == eventObject.day &&
                        year == eventObject.year &&
                        month + 1 == eventObject.month){
                            let eventCounter = eventObject.events.length;
                            eventObject.events.forEach((event) => {
                                if(event.isComplete){
                                    eventCounter --;
                                }
                            });
                            if(eventCounter != 0){
                                event = true;
                            }
                        }
                });

        if(i == new Date().getDate() && 
        year == new Date().getFullYear() &&
        month == new Date().getMonth()){

            if(event){
                days += `<div class="day today event" >${i}</div>`;
            }
            else{
                days += `<div class="day today" >${i}</div>`;
            }
            updateEvents(i);
            getActiveDay(today.getDate());

        }
        else{
            if(event){
                days += `<div class="day event" >${i}</div>`;
            }
            else{
                days += `<div class="day" >${i}</div>`;
            }
        }
    }

    for(let j = 1; j <= nextDays; j++){
        days += `<div class="day next-month" >${j}</div>`;
    }

    daysContainer.innerHTML = days;
    addListener();
}

initCalendar();

function prevMonth(){
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    initCalendar();
}

prevButton.addEventListener("click", prevMonth);
nextButton.addEventListener("click", nextMonth);

todayButton.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
    updateEvents(today.getDate());
    getActiveDay(today.getDate());
});

searchButton.addEventListener("click", function(){
    let dateSearch = dateInput.value.split("-");
    if(parseInt(dateSearch[0]) > 1800 &&
    parseInt(dateSearch[1]) < 13 &&
    parseInt(dateSearch[2]) < 32){
        month = dateSearch[1] - 1;
        year = dateSearch[0];
        initCalendar();

        setTimeout(() => {

            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
                if(!day.classList.contains("prev-month")&&
                !day.classList.contains("next-month")&&
                day.innerHTML == dateSearch[2]){
                    day.classList.add("selected");
                    getActiveDay(dateSearch[2]);
                }
            });
        }, 100);

        return;
    }
    alert("Geçersiz tarih girişi. Tekrar deneyin.");
});

function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            selectedDay = Number(e.target.innerHTML);
            getActiveDay(e.target.innerHTML);
            updateEvents(e.target.innerHTML);
            
            days.forEach((day) => {
                day.classList.remove("selected");
            });

            if(e.target.classList.contains("prev-month")){
                prevMonth();

                setTimeout(() => {

                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if(!day.classList.contains("prev-month")&&
                        day.innerHTML == e.target.innerHTML){
                            day.classList.add("selected");
                        }
                    });
                }, 100);
            }
            else if(e.target.classList.contains("next-month")){
                nextMonth();

                setTimeout(() => {

                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if(!day.classList.contains("next-month")&&
                        day.innerHTML == e.target.innerHTML){
                            day.classList.add("selected");
                        }
                    });
                }, 100);
            }
            else{
                const days = document.querySelectorAll(".day");
                days.forEach((day) => {
                    if(!day.classList.contains("prev-month")&&
                    !day.classList.contains("next-month")&&
                    day.innerHTML == e.target.innerHTML){
                        day.classList.add("selected");
                    }
                })
            }
        });
    });
}

function getActiveDay(date){
    const day = new Date(year, month, date);
    selectedDay = date;
    dateTitle.innerHTML = weekdays[day.getDay()];
    dateSubtitle.innerHTML = `${date} ${months[month]} ${year}`;
}

function updateEvents(date){
    let events= "";
    eventsArray.forEach((event) => {
        if(
            date == event.day &&
            month + 1 == event.month &&
            year == event.year
        ) {
            event.events.forEach((event) => {
                events += `
                <div class="event ${event.isComplete ? "complete" : ""}">
                    <div class="event-title">${event.title}</div>
                    <div class="event-time">${event.time}</div>
                    <span class="${event.isComplete ? "replay" : "check"}"></span>
                    <a href="././event.html" class="edit"></a>
                    <span class="cancel"></span>
                </div>
                `;
            });
        }
    });

    if((events == "")) {
        events = `<h3>Etkinlik yok</h3>`;
    }

    eventsContainer.innerHTML = events;
    buttonsEvent();
}

function buttonsEvent(){
    let events = document.querySelectorAll(".event");
    events.forEach((eventNode) => {
        eventNode.addEventListener("click", (e) => {
            if(e.target.classList.contains("check")){
                eventsArray.forEach((event) => {
                    if(
                        selectedDay == event.day &&
                        month + 1 == event.month &&
                        year == event.year
                    ) {
                        event.events.forEach((event) => {
                            if(event.title == eventNode.children[0].innerHTML &&
                                event.time == eventNode.children[1].innerHTML &&
                                event.isComplete == eventNode.classList.contains("complete")){
                                    e.target.classList.remove("check");
                                    e.target.classList.add("replay");
                                    eventNode.classList.add("complete");
                                    event.isComplete = true;
                                }
                        });
                    }
initCalendar();
                });
            }
            else if(e.target.classList.contains("replay")){
                eventsArray.forEach((event) => {
                    if(
                        selectedDay == event.day &&
                        month + 1 == event.month &&
                        year == event.year
                    ) {
                        event.events.filter((event) => {
                            if(event.title == eventNode.children[0].innerHTML &&
                                event.time == eventNode.children[1].innerHTML &&
                                event.isComplete == eventNode.classList.contains("complete")){
                                    e.target.classList.add("check");
                                    e.target.classList.remove("replay");
                                    eventNode.classList.remove("complete");
                                    event.isComplete = false;
                                }
                        });
                    }
initCalendar();
                });
            }
            else if(e.target.classList.contains("edit")){
                console.log("aaa");
            }
            else if(e.target.classList.contains("cancel")){
                eventsArray.forEach((event) => {
                    if(
                        selectedDay == event.day &&
                        month + 1 == event.month &&
                        year == event.year
                    ) {
                        event.events = event.events.filter((event) => {
                            if(event.title == eventNode.children[0].innerHTML &&
                                event.time == eventNode.children[1].innerHTML &&
                                event.isComplete == eventNode.classList.contains("complete")){
                                    eventNode.remove();
                                }
                            else{
                                return event;
                            }
                        });
                    }
initCalendar();
                });
            }
        });
    })
}
/**
 * events += `
                            <div class="event ${event.isComplete ? "complete" : ""}">
                                <div class="event-title">${event.title}</div>
                                <div class="event-time">${event.time}</div>
                                <span class="${event.isComplete ? "replay" : "check"}"></span>
                                <span class="edit"></span>
                                <span class="cancel"></span>
                            </div>
                            `;
 */