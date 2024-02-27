function setup()
{
    createCanvas(1000, 1000);
    textAlign(CENTER);
    pixelDensity(1);
        
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

function draw() {
    // Clearing the canvas every loop so no image will be duplicated
    clear();
    
    background(200);

    // Displaying the webcam video
    image(webcam_preview, image_column_1, image_row_1, image_width, image_height);

    // Making sure webcam_capture is only displayed if it exists
    if (webcam_capture) {
        // Displaying titles above each image
        displayTitle();
        // Drawing all the images
        drawImg();
        
        drawFaceFilter();

    }else{
        text('Select capture to proceed', text_column_1, text_row_1)
    }
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
    capture_button.position(image_width * 0.5 - canvas_width_margin, canvas_height_margin + image_height * 1.05);
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
    
    capture_button_2 = createButton('Update Face!');
    // Adjusting the position of the capture button
    capture_button_2.position(image_width * 4 - canvas_width_margin * 2.3, image_row_5 + canvas_height_margin * 2.1);
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
    text('Webcam Image', text_column_1, text_row_1);
    text('Grayscale and Brightness', text_column_2, text_row_1);

    text('Red Channel', text_column_1, text_row_2);
    text('Blue Channel', text_column_2, text_row_2);
    text('Green Channel', text_column_3, text_row_2);

    text('Red Channel Threshold', text_column_1, text_row_3);
    text('Green Channel Threshold', text_column_2, text_row_3);
    text('Blue Channel Threshold', text_column_3, text_row_3);

    text("Webcam Image (Repeat)", text_column_1, text_row_4);
    text('RGB to CMY', text_column_2, text_row_4);
    text('RGB to YCbCr', text_column_3, text_row_4);

    text('Face Detection Filter', text_column_1, text_row_5);
    text('RGB to CMY Threshold', text_column_2, text_row_5);
    text('RGB to YCbCr Threshold', text_column_3, text_row_5);
    
    text('Capture Image for Face Filter', text_column_4, text_row_5);
    
    // Push and pop to prevent styling to be carried over other functions
    push();
        textAlign(CENTER);
        fill('red');
        text('No face(s) detected.\nPlease re-capture by\nclicking the "Update Face!"\nbutton beside.', image_column_1 + (image_width)/2, image_row_5 + image_height / 3);
    pop();
    
    push();
        textAlign(LEFT);
        text('Click "1" - No Filter\nClick "2" - Grayscale\nClick "3" - Blurred\nClick "4" - Colour Converted\nClick "5" - Grayscale Pixelated', text_column_1 - image_width / 2, text_row_5 + image_height + canvas_width_margin * 1.5);
    pop();
}