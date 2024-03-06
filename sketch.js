// COMMENTARY:
//In task 7, I performed image thresholding in black and white for each colour channels separately so that it is easier to compare. I was able to analyse their final output under different circumstances. After adjusting the slider to explore different values and compare their outputs, I found out that the red channel are more visible under warmer tone colours. This might be due to warmer toned colours containing higher levels of red elements compared to the other channels. When I am in the thresholding image, I can see more red elements in my face compared to the surroundings. In contrast, blue channel are more visible on cooler tone colours. When passing in an image of a sky, I can clearly see the amount of blue elements contained are more highlighted compared to others. On the other hand, green is more visible in natural tones that highlight trees and more. When working on my project outdoors, with all the colours in the image, separate channel thresholding are able to segment out different elements, red channel thresholding will highlight my skin tone, the blue channel will highlight the sky, while the green channel will highlight the surrounding greenery.

//Since the conversion from RGB to CMY involves subtracting the RGB values from 255, it just basically inverting the colours. Therefore, the thresholding result for the colour space appeared as the opposite of the thresholding results from all the RGB channels combined. On the other hand, YCbCr doesn't just invert the RGB value, it has a more complex algorithm. YCbCr creates the colours from brightness instead of just pure colour elements itself which differs comapred to the RGB thresholding. Since it uses luminance in the algorithm, the noise is more visible in the thresholding compared to RGB thresholding.

//One challenge I encountered was that despite following the formula provided in the colour conversion cheatsheet for YCbCr space conversion, my test image did not match the example provided below the question paper. I resolved the issue by researching online and discovered that I have to increase an extra 128 to the Cb and Cr values to ensure they remain within the range. Face detection is also another challenge due to the performance issues I encountered with the face-api I planned to use. This API caused a major lag in the files, making me use back the objectdetect.js used in Coursera. However, implementing this took me a long time of debugging.

//I completed the project when there was still a week to spare before the deadline, but even so, I would still try to look deeper into the material covered in Coursera beforehand in advance so that I can make myself familiar with the concepts and minimalise the time I spent on debugging, which caused the delay.

//My extension uses face detecion to track head movement, allowing players to collect coins that are randomly positioned with their head movement within the webcam video before a timer runs out. It also comes with a high score system. This concept is unique because it combines real life interaction with face detection that were taught to challenges player's agility for a better gaming experience.

// CODE:
function setup()
{
    // Setup the default page is the extension button isn't toggled
    if(!extension_page) {
        pixelDensity(1);
        setupDefault();
    } else {
        // Otherwise setup the extension page
        setupExtension();
    }
    
}

function draw() {
    // Clearing the canvas every loop so no image will be duplicated
    clear();
    background(200);
    textAlign(CENTER);

    // Draw the default page is the extension button isn't toggled
    if(!extension_page) {
        drawDefault();
    } else {
        // Otherwise draw the extension page
        drawExtension();
    };

}

function drawDefault() {
    // Displaying the webcam video
    image(webcam_preview, image_column_1, image_row_1, image_width, image_height);

    // Making sure webcam_capture is only displayed if it exists
    if (webcam_capture) {
        // Displaying titles above each image
        displayTitle();
        // Drawing all the images
        drawImg();
        
        drawFaceFilter();

        extension_button.mousePressed(extensionPage);

    }else{
        text('Select capture to proceed', text_column_1, text_row_1)
    }
}

function setupDefault() {
    createCanvas(1000, 1000);
            
    setupWebcam();
    setupFaceDetector();   
    
    // Task 1 - Load an image using webcam with mouse interaction
    // Load the images and sliders when the capture button is clicked
    capture_button.mousePressed(() => {
        captureImg();
        setupGUI();
        drawFilterVideo();
    });
}

function setupWebcam()
{
    // Creating a webcam video
    webcam_preview = createCapture(VIDEO);
    // Adjusting the position and size of the webcam video
    webcam_preview.position(image_column_1, image_row_1);
    webcam_preview.size(image_width, image_height);
    
    // Creating a capture button
    capture_button = createButton('Capture');
    // Adjusting the position of the capture button
    capture_button.position(image_width * 0.4 - canvas_width_margin, canvas_height_margin + image_height * 1.05);
    capture_button.size(100, 30);
}

function captureImg() {
    // Capturing the image from the webcam video
    webcam_capture = webcam_preview.get();
    // Removing the webcam video and the capture button
    webcam_preview.remove();
    capture_button.remove();
}

function setupGUI() {
    // Creating threshold slider for the red channel
    red_channel_slider = createSlider(0, 256, 100);
    red_channel_slider.position(slider_column_1, colour_channel_row);
    red_channel_slider.size(slider_size);

    // Creating threshold slider for the green channel
    green_channel_slider = createSlider(0, 256, 100);
    green_channel_slider.position(slider_column_2, colour_channel_row);
    green_channel_slider.size(slider_size);

    // Creating threshold slider for the blue channel
    blue_channel_slider = createSlider(0, 256, 100);
    blue_channel_slider.position(slider_column_3, colour_channel_row);
    blue_channel_slider.size(slider_size);    

    // Creating threshold slider for the CMY colour space
    cmy_slider = createSlider(0, 255, 100);
    cmy_slider.position(slider_column_2, colour_space_row);
    cmy_slider.size(slider_size);

    // Creating threshold slider for the YCbCr colour space
    ycbcr_slider = createSlider(0, 255, 100);
    ycbcr_slider.position(slider_column_3, colour_space_row);
    ycbcr_slider.size(slider_size);
    
    // Create the 2nd capture button to update image for all
    capture_button_2 = createButton('Update Face For All Images!');
    capture_button_2.position(image_width * 4 - canvas_width_margin * 4, image_row_2 - canvas_height_margin * 0.8);
    capture_button_2.size(image_width, 50);

    // Create the 3rd button to update image solely for face detection
    capture_button_3 = createButton('Update Face For Face Detection!');
    capture_button_3.position(image_width * 4 - canvas_width_margin * 4, image_row_2 + canvas_height_margin * 0.2);
    capture_button_3.size(image_width, 50);

    // Create the extension button
    extension_button = createButton('Enter Extension Page!');
    extension_button.position(image_width * 4 - canvas_width_margin * 4, image_row_2 + canvas_height_margin * 1.2);
    extension_button.size(image_width, 50);
}

function drawImg() {
    // Task 2 and Task 3 - Display the webcam image and scale it to the minimum resolution
    image(webcam_capture, image_column_1, image_row_1, image_width, image_height);

    // Task 4 and Task 5 - Convert image to grayscale, increase brightness, and limit the pixel intensity
    image(grayscaleBrightnessFilter(webcam_capture, true), image_column_2, image_row_1);

    // Task 6 - Split webcam image into three color channels
    image(redChannelFilter(webcam_capture, false), image_column_1, image_row_2);
    image(greenChannelFilter(webcam_capture, false), image_column_2, image_row_2);
    image(blueChannelFilter(webcam_capture, false), image_column_3, image_row_2);

    // Task 7 - Image thresholding with slider for each color channel
    image(redChannelFilter(webcam_capture, true), image_column_1, image_row_3);
    image(greenChannelFilter(webcam_capture, true), image_column_2, image_row_3);
    image(blueChannelFilter(webcam_capture, true), image_column_3, image_row_3);

    // Task 9 - Two colour space conversion, RGB to CMY and RGB to ITU.BT-601 Y’CbCr
    image(webcam_capture, image_column_1, image_row_4);
    image(convertToCMY(webcam_capture, false), image_column_2, image_row_4);
    image(convertToYCbCr(webcam_capture, false), image_column_3, image_row_4);

    // Task 10 - Image thresholding with slider for the above two colour space conversion images
    image(convertToCMY(webcam_capture, true), image_column_2, image_row_5);
    image(convertToYCbCr(webcam_capture, true), image_column_3, image_row_5);   
}

function displayTitle() {

    textAlign(CENTER);

    text('Webcam Image', text_column_1, text_row_1);
    text('Grayscale and Brightness', text_column_2, text_row_1);

    text('Red Channel', text_column_1, text_row_2);
    text('Green Channel', text_column_2, text_row_2);
    text('Blue Channel', text_column_3, text_row_2);

    text('Red Channel Threshold', text_column_1, text_row_3);
    text('Green Channel Threshold', text_column_2, text_row_3);
    text('Blue Channel Threshold', text_column_3, text_row_3);

    text("Webcam Image (Repeat)", text_column_1, text_row_4);
    text('RGB to CMY', text_column_2, text_row_4);
    text('RGB to YCbCr', text_column_3, text_row_4);

    text('Face Detection Filter', text_column_1, text_row_5);
    text('RGB to CMY Threshold', text_column_2, text_row_5);
    text('RGB to YCbCr Threshold', text_column_3, text_row_5);
    
    text('Update Image Here', text_column_4, text_row_1);
    
    // Push and pop to prevent styling to be carried over other functions
    push();
        textAlign(CENTER);
        fill('red');
        text('No face(s) detected.\nPlease re-capture at\nthe top right.', image_column_1 + (image_width)/2, image_row_5 + image_height / 3);
    pop();
    
    push();
        textAlign(LEFT);
        text('Click "1" - No Filter\nClick "2" - Grayscale\nClick "3" - Blurred\nClick "4" - Colour Converted\nClick "5" - Grayscale Pixelated', text_column_1 - image_width / 2, text_row_5 + image_height + canvas_width_margin * 1.5);
    pop();
}