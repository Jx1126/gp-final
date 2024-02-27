// Task 12 - Face Detection using Week 19 Coursera approach
function setupFaceDetector() {
    // Creating webcam video
    detect_video = createCapture(VIDEO);
    detect_video.size(image_width, image_height);
    detect_video.hide();
    
    var scaleFactor = 1.2;
    detector = new objectdetect.detector(image_width, image_height, scaleFactor, classifier);
    detect_frame = createImage(image_width, image_height); 
}

function drawFilterVideo() {
    another_video = createCapture(VIDEO);
    another_video.size(image_width, image_height);
    another_video.position(image_column_4, image_row_5)
}

function getFrame() {
    var imageChoosen = another_video.get();
    imageChoosen.resize(image_width, image_height);
    return imageChoosen;
}

function detectFaces(source) {
    
    var detect_frame = source.get();
    faces = detector.detect(detect_frame.canvas);
    
    for(var i = 0; i < faces.length; i++) {
        
        var face = faces[i];
        if(face[4] > 4) {
            // Retrieving the area of the detected face
            face_bound = createImage(int(face[2]), int(face[3]));
            let bound = detect_frame.get(face[0], face[1], face[2], face[3]);
            face_bound.set(0, 0, bound);
        }
    }
    return face_bound;
}

function drawFaceFilter() {
    saved_frame = getFrame();
    
    if(detected_face) {
        // Task 13a - Grayscale filter at detected face
        if(key == 2) {
            edited_face = grayscaleBrightnessFilter(detected_face, false);
            
        // Task 13b - Blur filter at detected face
        } else if (key == 3) {
                edited_face = blurFilter(detected_face);
            
        // Task 13c - Colour converted filter at detected face
        } else if (key == 4) {
            edited_face = convertToCMY(detected_face, false);
            
        // Task 13d - Pixelate filter at detected face
        } else if (key == 5) {
            // Task 13d i - Turn image into grayscale
            var gray_edited = grayscaleBrightnessFilter(detected_face, false);
            // Task 13d ii 
            edited_face = pixelateFilter(gray_edited);
        
        // Return to original if other key is pressed
        } else {
            edited_face = detected_face;
        }

        // Push and pop to make sure the translate doesn't affect other parts of the code
        push();
            // Translate to make sure they are drawn in the right positioning
            translate(image_column_1, image_row_5);
            for(var i = 0; i < faces.length; i++) {
                face = faces[i];
                if(face[4] > 4) {
                    image(foreground, 0, 0, image_width, image_height);
                    image(edited_face,  face[0], face[1], face[2], face[3], 0, 0, image_width, image_height);
                }
            }
        pop();
        
    } else {
        capture_button_2.mousePressed(() => {
            foreground = another_video.get();
            detected_face = detectFaces(saved_frame);
        });
    }
}