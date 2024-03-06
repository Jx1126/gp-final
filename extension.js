// EXTENSION:
class Coin {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        push();
        fill("#FFA481");
        ellipse(this.x, this.y, 40, 40);
        fill("#FFCA81");
        ellipse(this.x, this.y, 30, 30);
        pop();
    }

    returnX() {
        return this.x;
    }

    returnY() {
        return this.y;
    }
}

function extensionPage() {

    extension_page = true;

    webcam_preview.remove();
    another_video.remove();
    
    red_channel_slider.remove();
    green_channel_slider.remove();
    blue_channel_slider.remove();
    cmy_slider.remove();
    ycbcr_slider.remove();
    
    capture_button.remove();
    capture_button_2.remove();
    capture_button_3.remove();
    extension_button.remove();

    noCanvas();
    setup();
}

function setupExtension() {
    createCanvas(1000, 1000);

    extension_video = createCapture(VIDEO);
    // Hiding the video or else it will create another video after the image() below
    extension_video.hide();

    start_button = createButton('START');
    start_button.position(image_column_2 * 2, image_row_3 * 1.5);
    start_button.size(100, 50);

    // If the start button is clicked, remove it and change the state into true
    start_button.mousePressed(() => {
        start_button.remove();
        start_state = true;
        createTimer();
    });
}

function drawExtension() {
    // Draw the webcam video
    image(extension_video, extension_video_x, extension_video_y, extension_video_width, extension_video_height);
    
    push();
    translate(extension_video_x, extension_video_y);
    
    // Draw rectangle bound around user and get the face detection coordinates
    getPlayerHead();
    
    // Draw the coins
    drawCoins();
    checkCollision();
    
    pop();
    
    // Draw the texts
    drawExtensionText();
}

function drawExtensionText() {

    push();
    
    textAlign(CENTER);
    textSize(30);
    textStyle(BOLD);
    text('Collect the coins!', text_column_3, text_row_1);

    textSize(18);
    textStyle(NORMAL);
    text('Move your head around the webcam to collect the coins as fast as possible!', text_column_3, text_row_1 * 1.8);

    // Display the current timer
    text('Current timer: ' + timer + "s", text_column_3, text_row_1 * 2.5);

    // Display the amount of coins left to collect
    text('Coins left: ' + coins.length, text_column_3 + extension_video_width / 3, text_row_1 * 2.5);
    
    // If there is not fastest time, display '-', else, display the fastest time
    text('Fastest timing: ' + (fastest_time == null ? '-' : fastest_time) + "s", text_column_3 - extension_video_width / 3, text_row_1 * 2.5);

    pop();
}

function getPlayerHead() {
    var face_detect = extension_video.get();
    faces_ex = detector.detect(face_detect.canvas);

    push();
    for(var i = 0; i < faces_ex.length; i++) {
        var face_ex = faces_ex[i];
        if(face_ex[4] > 4) {
            push();
            var rect_x = face_ex[0] * 4;
            var rect_y = face_ex[1] * 4;
            var rect_w = face_ex[2] * 4;
            var rect_h = face_ex[3] * 4;

            noFill();
            strokeWeight(3);
            stroke(255);
            rect(rect_x, rect_y, rect_w, rect_h);
            pop();
        }
    }
    pop();
}

function drawCoins() {
    
    // If the click button is clicked
    if(start_state) {
        
        // Total amount of coins to be draw
        var total_coins = 10;
        
        // If no coins has been added to the array, add the coins
        if(coins.length == 0) {
            for(var i = 0; i < total_coins; i++) {
                // Giving random x and y coordinates for the coins
                var random_x = random(50, extension_video_width - 50);
                var random_y = random(50, extension_video_height - 50);
                // Pushing the coins into the array
                coins.push(new Coin(random_x, random_y));
            }
        }
        
        // Drawing the coins
        for(var i = 0; i < coins.length; i++) {
            push();
            noStroke();
            coins[i].draw();
            pop();
        }
    }
}

function checkCollision() {

    for (var i = 0; i < faces_ex.length; i++) {
        for (var j = 0; j < coins.length; j++) {
            // Calculate the center point of the detected face
            var face_center_x = faces_ex[i][0] + faces_ex[i][2] / 2;
            var face_center_y = faces_ex[i][1] + faces_ex[i][3] / 2;
            // Calculate the distance between the center point of the face and the coins
            var distance = dist(face_center_x * 4, face_center_y * 4, coins[j].returnX(), coins[j].returnY());
            // Remove the coins from the array if the distance is less than 30
            if (distance < 30) {
                coins.splice(j, 1);
            }

            // End the game when all coins are collected
            if(coins.length == 0) {
                start_state = false;
                clearInterval(timer_interval);
                if(timer > fastest_time) {
                    timer = 0;
                };
                if(fastest_time == null || timer < fastest_time) {
                    fastest_time = timer;
                    timer = 0;
                    console.log('New fastest time updated!')
                }
                retry_button = createButton('RETRY');
                retry_button.position(image_column_2 * 2, image_row_3 * 1.5);
                retry_button.size(100, 50);

                retry_button.mousePressed(setupExtension);

            }
        }
    }
}

function increment() {
    timer++;
}

function createTimer() {
    if(start_state) {
        timer_interval = setInterval(increment, 1000);
    }
}