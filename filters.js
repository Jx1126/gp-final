// Task 4 - Convert image into grayscale and increase brightness in the same nested loops
function grayscaleBrightnessFilter(img, brightness) {
    var imgOutput = createImage(img.width, img.height);
    
    imgOutput.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++){
        for(var y = 0; y < img.height; y++){
            
            var index = (y * img.width + x) * 4;

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            // Gray value from Coursera
            var gray = r * 0.299 + g * 0.587 + b * 0.0114;
            
            imgOutput.pixels[index + 0] = gray;
            imgOutput.pixels[index + 1] = gray;
            imgOutput.pixels[index + 2] = gray;
            imgOutput.pixels[index + 3] = 255;
            
            if(brightness) {
            // Increasing the brightness by 20%
            imgOutput.pixels[index + 0] = imgOutput.pixels[index + 0] * 1.2;
            imgOutput.pixels[index + 1] = imgOutput.pixels[index + 1] * 1.2;
            imgOutput.pixels[index + 2] = imgOutput.pixels[index + 2] * 1.2;
            
            }
            
            // Task 5 - Constraining the brightness
            imgOutput.pixels[index + 0] = constrain(imgOutput.pixels[index + 0], 0, 255);
            imgOutput.pixels[index + 1] = constrain(imgOutput.pixels[index + 1], 0, 255);
            imgOutput.pixels[index + 2] = constrain(imgOutput.pixels[index + 2], 0, 255);
        }
    }
    imgOutput.updatePixels();
    return imgOutput;
}

// Task 6 - Red channel
function redChannelFilter(img, threshold) {
    var imgOutput = createImage(img.width, img.height);
    
    imgOutput.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++){
        for(var y = 0; y < img.height; y++){
            
            var index = (y * img.width + x) * 4;
            var r = img.pixels[index + 0];
            
            // Task 7 - Red channel image thresholding with slider
            if(threshold) {
                if(red_channel_slider.value() > r){
                    r = 0;
                } else {
                    r = 255;
                }
            }
        
            imgOutput.pixels[index + 0] = r;
            imgOutput.pixels[index + 1] = threshold ? r : 0;
            imgOutput.pixels[index + 2] = threshold ? r : 0;
            imgOutput.pixels[index + 3] = 255;
        }
    }
    imgOutput.updatePixels();
    return imgOutput;
}

// Task 6 - Green channel
function greenChannelFilter(img, threshold) {
    var imgOutput = createImage(img.width, img.height);
    
    imgOutput.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++){
        for(var y = 0; y < img.height; y++){
            
            var index = (y * img.width + x) * 4;
            var g = img.pixels[index + 1];
            
            // Task 7 - Green channel image thresholding with slider
            if(threshold) {
                if(green_channel_slider.value() > g){
                    g = 0;
                } else {
                    g = 255;
                }
            }
            
            imgOutput.pixels[index + 0] = threshold ? g : 0;
            imgOutput.pixels[index + 1] = g;
            imgOutput.pixels[index + 2] = threshold ? g : 0;
            imgOutput.pixels[index + 3] = 255;
        }
    }
    imgOutput.updatePixels();
    return imgOutput;
}

// Task 6 - Blue channel
function blueChannelFilter(img, threshold) {
    var imgOutput = createImage(img.width, img.height);
    
    imgOutput.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++){
        for(var y = 0; y < img.height; y++){
            
            var index = (y * img.width + x) * 4;
            var b = img.pixels[index + 2];
            
            // Task 7 - Blue channel image thresholding with slider
            if(threshold) {
                if(blue_channel_slider.value() > b){
                    b = 0;
                } else {
                    b = 255;
                }
            }
            
            imgOutput.pixels[index + 1] = threshold ? b : 0;
            imgOutput.pixels[index + 0] = threshold ? b : 0;
            imgOutput.pixels[index + 2] = b;
            imgOutput.pixels[index + 3] = 255;
        }
    }
    imgOutput.updatePixels();
    return imgOutput;
}

// Task 9 - Colour space conversion, RGB to CMY
function convertToCMY(img, threshold) {
    var imgOutput = createImage(img.width, img.height);
    
    imgOutput.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++){
        for(var y = 0; y < img.height; y++){
            
            var index = (y * img.width + x) * 4;

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            // Formulas were taken from the ColourSpaceConversions.PDF provided in Coursera
            var cyan = 255 - r;
            var magenta = 255 - g;
            var yellow = 255 - b;
            
            // Task 10 - CMY colour space image thresholding with slider
            if(threshold) {
                if(cmy_slider.value() > cyan){
                    cyan = 0;
                }

                if(cmy_slider.value() > magenta){
                    magenta = 0;
                }

                if(cmy_slider.value() > yellow){
                    yellow = 0;
                }   
            }
                        
            imgOutput.pixels[index + 0] = cyan;
            imgOutput.pixels[index + 1] = magenta;
            imgOutput.pixels[index + 2] = yellow;
            imgOutput.pixels[index + 3] = 255;
            
            // Task 5 - Constraining the brightness
            imgOutput.pixels[index + 0] = constrain(imgOutput.pixels[index + 0], 0, 255);
            imgOutput.pixels[index + 1] = constrain(imgOutput.pixels[index + 1], 0, 255);
            imgOutput.pixels[index + 2] = constrain(imgOutput.pixels[index + 2], 0, 255);
        }
    }
    imgOutput.updatePixels();
    return imgOutput;
}

// Task 9 - Colour space conversion, RGB to ITU.BT-601 Y’CbCr
function convertToYCbCr(img, threshold) {
    var imgOutput = createImage(img.width, img.height);
    
    imgOutput.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width; x++){
        for(var y = 0; y < img.height; y++){
            
            var index = (y * img.width + x) * 4;

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            // Formulas were taken from the ColourSpaceConversions.PDF provided in Coursera
            // An additional 128 was added to Cb and Cr so the result is always positive
            // Reference: https://stackoverflow.com/a/58683220
            var luma = 0.299 * r + 0.587 * g + 0.114 * b;
            var cb = 128 + (-0.169 * r - 0.331 * g + 0.500 * b);
            var cr = 128 + (0.500 * r - 0.419 * g - 0.081 * b);
            
            // Task 10 - YCbCr colour space image thresholding with slider
            if(threshold) {
                if(ycbcr_slider.value() > luma){
                 luma = 0;
                }

                if(ycbcr_slider.value() > cb){
                    cb = 0;
                }

                if(ycbcr_slider.value() > cr){
                    cr = 0;
                }
            }
                        
            imgOutput.pixels[index + 0] = constrain(luma, 0, 255);
            imgOutput.pixels[index + 1] = constrain(cb, 0, 255);
            imgOutput.pixels[index + 2] = constrain(cr, 0, 255);
            imgOutput.pixels[index + 3] = 255;
        }
    }
    imgOutput.updatePixels();
    return imgOutput;
}

function blurFilter(img) {
    var imgOutput = createImage(img.width, img.height);
    
    imgOutput.loadPixels();
    img.loadPixels();
    
    var matrix = blurStrength(11);
    var matrix_size = matrix.length;
    
    for(var x = 0; x < img.width; x++){
        for(var y = 0; y < img.height; y++){
            
            var index = (y * img.width + x) * 4;
            var c = convolution(x, y, matrix, img);

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            imgOutput.pixels[index + 0] = c[0];
            imgOutput.pixels[index + 1] = c[1];
            imgOutput.pixels[index + 2] = c[2];
            imgOutput.pixels[index + 3] = 255;
        }
    }
    imgOutput.updatePixels();
    return imgOutput;
}

// Function that create the matrix for the blur
function blurStrength(strength) {
    var main_array = [];
    
    for(var i = 0; i < strength; i++) {
        var sub_array = [];
        
        for( var j = 0; j < strength; j++) {
            var base = strength * strength;
            sub_array.push(1 / base);
        }
        main_array.push(sub_array);
    }
    return main_array;
}

function convolution(x, y, matrix, img) {
    var total_r = 0
    var total_g = 0;
    var total_b = 0;
    
    var matrix_size = matrix.length;
    var offset = floor(matrix_size / 2);
    
    for(var i = 0; i < matrix_size; i++) {
        for(var j = 0; j < matrix_size; j++) {
            var x_pos = constrain(x + i - offset, 0, img.width - 1);
            var y_pos = constrain(y + j - offset, 0, img.height - 1);
            
            var index = (y_pos * img.width + x_pos) * 4;
            index = constrain(index, 0, img.pixels.length - 1);
            
            total_r += img.pixels[index + 0] * matrix[i][j];
            total_g += img.pixels[index + 1] * matrix[i][j];
            total_b += img.pixels[index + 2] * matrix[i][j];
        }
    }
    return [total_r, total_g, total_b];
}

function pixelateFilter(img) {
    
    var imgOutput = createImage(img.width, img.height);
    // Pixelate the image into 5x5 block
    var pixelate_size = 5;
    var pixelate_area = pixelate_size * pixelate_size;
    
    imgOutput.loadPixels();
    img.loadPixels();
    
    for(var x = 0; x < img.width - (img.width % pixelate_size); x += pixelate_size) {
        for(var y = 0; y < img.height - (img.height % pixelate_size); y += pixelate_size) {

            var total_intensity = 0;
            
            // Task 3d v - Looping through all blocks repeating Task 3d iii and iv
            for(var i = 0; i < pixelate_size; i++) {
                for(var j = 0; j < pixelate_size; j++) {
                    
                    // Going through each pixels
                    var x_pixel = x + i;
                    var y_pixel = y + j;
                    
                    // If the pixels are within the image
                    if (x_pixel < img.width && y_pixel < img.height) {
                        
                        // Task 13d iii - Accessing each pixel's intensity
                        var intensity = img.get(x_pixel, y_pixel)[0];
                        
                        // Task 13d iii - Calculating the total intensity
                        total_intensity += intensity;
                    }
                }
            }
            
            // Task 13d iii - Calculating the average intensity for each block
            var avg_intensity = total_intensity / pixelate_area;
            
            // Task 3d v - Looping through all blocks repeating Task 3d iii and iv
            for(var i = 0; i < pixelate_size; i++) {
                for(var j = 0; j < pixelate_size; j++) {
                    
                    // Going through each pixels
                    var x_pixel = x + i;
                    var y_pixel = y + j;
                    
                    // If the pixels are within the image
                    if (x_pixel < img.width && y_pixel < img.height) {
                        
                        // Fill each block's rgb with the average intensity value and set alpha to opaque
                        var block_colour = [avg_intensity, avg_intensity, avg_intensity, 255]
                        
                        // Task 13d iv - Set each block of the images with the average intensity value
                        imgOutput.set(x_pixel, y_pixel, block_colour);
                    }
                }
            }
        }
    }
    imgOutput.updatePixels();
    return imgOutput;
}