//VIDEO (BACKGROUND NAVIGATION)
document.addEventListener("DOMContentLoaded", function() {
    // Array to store video file names
    var videos = ["videos/nature/rain1.mp4", "videos/nature/rain2.mp4", "videos/nature/sun.mp4"]; 

    // Index to keep track of current video
    var currentVideoIndex = 0;

    // Get video container
    var videoContainer = document.getElementById("videoContainer");

    // Function to play the video
    function playVideo(videoSource) {
        // Create video element
        var video = document.createElement("video");
        video.src = videoSource;
        video.autoplay = true;
        video.loop = true;
        video.controls = false;

        // Append video to video container
        videoContainer.innerHTML = "";
        videoContainer.appendChild(video);

        // Reattach event listeners to next and previous buttons
        document.getElementById("nextButton").addEventListener("click", nextVideo);
        document.getElementById("previousButton").addEventListener("click", previousVideo);
    }

    // Function to change video source
    function changeVideo() {
        var videoSource = videos[currentVideoIndex];
        playVideo(videoSource);
    }

    // Function to handle next button click
    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        changeVideo();
    }

    // Function to handle previous button click
    function previousVideo() {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        changeVideo();
    }

    // Add event listeners to next and previous buttons
    document.getElementById("nextButton").addEventListener("click", nextVideo);
    document.getElementById("previousButton").addEventListener("click", previousVideo);

    // Load initial video
    changeVideo();

    // Prevent video player from appearing on double click
    videoContainer.addEventListener("dblclick", function(event) {
        event.preventDefault();
    });
});

//AUDIO WRT TO VIDEO
document.addEventListener("DOMContentLoaded", function () {
    // Array to store video file names and their associated songs with timestamps
    var videos = [
      {
        src: "videos/nature/rain1.mp4",
        songs: [
          { name: "Gentle Rain", timestamp: "00:00:00" },
          { name: "Rain On Window", timestamp: "00:30:19" },
          { name: "Rain On The Roof", timestamp: "00:53:30" },
          { name: "Thunder-storm", timestamp: "1:46:19 " }
        ]
      },
      {
        src: "videos/nature/rain2.mp4",
        songs: [
          { name: "Song A", timestamp: "0:20" },
          { name: "Song B", timestamp: "0:45" },
          { name: "Song C", timestamp: "1:30" }
        ]
      },
      {
        src: "videos/nature/sun.mp4",
        songs: [
          { name: "Song X", timestamp: "0:10" },
          { name: "Song Y", timestamp: "0:50" },
          { name: "Song Z", timestamp: "1:40" }
        ]
      }
    ];
  
    // Index to keep track of current video
    var currentVideoIndex = 0;
    var currentVideo = videos[currentVideoIndex];
    var currentSongIndex = 0; // Add a variable to track current song index
  
    // Get video container
    var videoContainer = document.getElementById("videoContainer");
  
    // Function to play the video
    function playVideo(videoSource) {
      // Create video element
      var video = document.createElement("video");
      video.src = videoSource;
      video.autoplay = true;
      video.loop = true;
      video.controls = false;
  
      // Append video to video container
      videoContainer.innerHTML = "";
      videoContainer.appendChild(video);
  
      // Reattach event listeners to next and previous buttons
      document.getElementById("nextButton").addEventListener("click", nextVideo);
      document.getElementById("previousButton").addEventListener("click", previousVideo);
    }
  
    // Function to change video source
    function changeVideo() {
      var videoSource = currentVideo.src;
      playVideo(videoSource);
    }
  
    // Function to handle next button click
    function nextVideo() {
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      currentVideo = videos[currentVideoIndex];
      currentSongIndex = 0; // Reset song index when changing video
      changeVideo();
    }
  
    // Function to handle previous button click
    function previousVideo() {
      currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
      currentVideo = videos[currentVideoIndex];
      currentSongIndex = 0; // Reset song index when changing video
      changeVideo();
    }
  
    // Add event listeners to next and previous buttons
    document.getElementById("nextButton").addEventListener("click", nextVideo);
    document.getElementById("previousButton").addEventListener("click", previousVideo);
  
    // Load initial video
    changeVideo();
  
    // Function to handle music button click
    document.getElementById("musicButton").addEventListener("click", function () {
      // Get the current song
      var currentSong = currentVideo.songs[currentSongIndex];
  
      // Display the song name and timestamp
      document.getElementById("audioNameDisplay").textContent = currentSong.name + " (" + currentSong.timestamp + ")";
  
      // Skip to the corresponding time in the video
      skipToTime(currentSong.timestamp);
  
      // Increment the song index
      currentSongIndex = (currentSongIndex + 1) % currentVideo.songs.length;
    });
  
    // Function to skip to a specific time in the video
    function skipToTime(timestamp) {
      var videoPlayer = document.querySelector("video");
      var timeParts = timestamp.split(":");
      var hours = parseInt(timeParts[0], 10);
      var minutes = parseInt(timeParts[1], 10);
      var seconds = parseInt(timeParts[2], 10);
      var totalSeconds = hours * 3600 + minutes * 60 + seconds;
      videoPlayer.currentTime = totalSeconds;
    }
  });


//TIMER
// Timer variables
let timerInterval;
let timerPaused = false;
let seconds = 0, minutes = 0, hours = 0;

// Timer display element
const timerDisplay = document.getElementById("timer");

// Button elements
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");

// Add event listeners to buttons
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);

// Start timer function
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

// Stop timer function
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerPaused = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateTimerDisplay();
}

// Pause timer function
function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerPaused = true;
    }
}

// Update timer function
function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    updateTimerDisplay();
}

// Update timer display function
function updateTimerDisplay() {
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Find Your Timer Box
const timerContainer = document.getElementById("timerContainer");
// Make it draggable
makeDraggable(timerContainer);

// Function to Make It Draggable
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Add event listener to the timer button
document.querySelector("#timerButton").addEventListener("click", function() {
    toggleTimer();
});

// Function to toggle the timer display
function toggleTimer() {
    const timerContainer = document.getElementById("timerContainer");
    if (timerContainer.style.display === "none") {
        timerContainer.style.display = "block";
        timerContainer.style.zIndex = "9999";
    } else {
        timerContainer.style.display = "none";
        timerContainer.style.zIndex = "-1";
    }
}

//TO-DO LIST
// Variable to track if the scrollbar has appeared
var scrollbarAppeared = false;

// Function to add a new task
function addTask() {
    var taskInput = document.getElementById("task-input");
    var taskText = taskInput.value.trim();
    if (taskText !== "") {
        var taskList = document.getElementById("task-list");
        var taskItem = document.createElement("li");
        taskItem.className = "task-item";
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="remove-btn" onclick="removeTask(this)">-</span>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = "";

        // Adjust the height of the widget's body
        adjustWidgetHeight();

        // Check if scrollbar has appeared after adding task
        checkScrollbar();
    } else {
        alert("Please enter a task!");
    }
}

// Function to remove a task
function removeTask(btn) {
    var taskItem = btn.parentNode;
    taskItem.parentNode.removeChild(taskItem);

    // Adjust the height of the widget's body
    adjustWidgetHeight();

    // Check if scrollbar has disappeared after removing task
    checkScrollbar();
}

// Function to adjust the height of the widget's body
function adjustWidgetHeight() {
    var taskList = document.getElementById("task-list");
    var taskItems = taskList.getElementsByClassName("task-item");
    var totalHeight = 140;

    // Calculate the total height of all tasks
    for (var i = 0; i < taskItems.length; i++) {
        totalHeight += taskItems[i].offsetHeight;
    }

    // Adjust the height of the widget's body if scrollbar has not appeared
    if (!scrollbarAppeared) {
        var widgetBody = document.getElementById("todo-widget");
        widgetBody.style.height = totalHeight + "px";
    }
}

// Function to check if scrollbar has appeared
function checkScrollbar() {
    var taskList = document.getElementById("task-list");
    scrollbarAppeared = taskList.scrollHeight > taskList.clientHeight;
}

// Function to make the widget movable
window.onload = function() {
    var draggableWidget = document.getElementById("todo-widget");
    var isDragging = false;
    var offsetX, offsetY;

    draggableWidget.addEventListener("mousedown", function(e) {
        isDragging = true;
        offsetX = e.clientX - draggableWidget.getBoundingClientRect().left;
        offsetY = e.clientY - draggableWidget.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", function(e) {
        if (isDragging) {
            draggableWidget.style.left = (e.clientX - offsetX) + "px";
            draggableWidget.style.top = (e.clientY - offsetY) + "px";
        }
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
    });
};

// Add event listener to the To-Do list button
document.querySelector(".sections:nth-child(5) .navbuttons").addEventListener("click", function() {
    toggleToDoList();
});

// Function to toggle the display of the To-Do list
function toggleToDoList() {
    const toDoListContainer = document.getElementById("todo-widget");
    if (toDoListContainer.style.display === "none") {
        toDoListContainer.style.display = "block";
    } else {
        toDoListContainer.style.display = "none";
    }
}

// Add event listener to the input field for the Enter key
document.getElementById("task-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


//CALCULATOR
// Add event listener to the calculator button
document.querySelector(".sections:nth-child(4) .navbuttons").addEventListener("click", function() {
    toggleCalculator();
});

// Function to toggle the display of the calculator
function toggleCalculator() {
    const calculatorContainer = document.querySelector(".CALcontainer");
    if (calculatorContainer.style.display === "none") {
        calculatorContainer.style.display = "block";
    } else {
        calculatorContainer.style.display = "none";
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('input[type="button"]');
    
    //FUNCTION TELLING WHAT IS C , DE AND =
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.value === 'C') {
                display.value = '';
            } else if (this.value === 'DE') {
                display.value = display.value.toString().slice(0, -1);
            } else if (this.value === '=') {
                display.value = evaluateExpression(display.value);
            } else {
                display.value += this.value;
            }
        });
    });

    //FUNCTION TO ALLOW KEYBOARD CONTROL
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const allowedKeys = /[0-9%\/*\-+\.=]|Backspace|Enter|Delete|Escape|\(|\)/;
        
        if (allowedKeys.test(key)) {
            event.preventDefault();
            if (key === 'Backspace') {
                display.value = display.value.slice(0, -1);
            } else if (key === 'Enter' || key === '=') {
                display.value = evaluateExpression(display.value);
            } else if (key === 'Escape') {
                display.value = '';
            } else {
                display.value += key;
            }
        }
    });

    //FUNCTION TO INCLUDE OPERATION WITH BOTH NEGATIVE AND POSITIVE VALUES
    function evaluateExpression(expression) {
        // Replace '×' and '÷' with '*' and '/'
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Handle negative and positive values
        expression = expression.replace(/(\d+)([\-+])(?=\d)/g, '$1 $2');

        // Evaluate expression
        try {
            return eval(expression);
        } catch (error) {
            return 'Error';
        }
    }
});

// Find Your Calculator Box
const calculator = document.querySelector(".calculator.draggable");

// Make it draggable
makeDraggable(calculator);

// Function to Make It Draggable
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.addEventListener('mousedown', dragMouseDown);

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener('mouseup', closeDragElement);
        // Call a function whenever the cursor moves:
        document.addEventListener('mousemove', elementDrag);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Stop moving when mouse button is released:
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
    }
}




