// Constant to store prefix values
const image_width = 160;
const image_height = 120;
const canvas_width_margin = 20;
const canvas_height_margin = 60;
const slider_size = 80;

// Constant to store image positionings
const image_column_1 = canvas_width_margin;
const image_column_2 = canvas_width_margin * 2 + image_width;
const image_column_3 = canvas_width_margin * 3 + image_width * 2;
const image_column_4 = canvas_width_margin * 4 + image_width * 3;

const image_row_1 = canvas_height_margin;
const image_row_2 = canvas_height_margin * 2 + image_height;
const image_row_3 = canvas_height_margin * 3 + image_height * 2;
const image_row_4 = canvas_height_margin * 4 + image_height * 3;
const image_row_5 = canvas_height_margin * 5 + image_height * 4;

// Constant to store slider positionings
const slider_column_1 = canvas_width_margin * 3;
const slider_column_2 = canvas_width_margin * 4 + image_width;
const slider_column_3 = canvas_width_margin * 5 + image_width * 2;

const colour_channel_row = canvas_height_margin * 3 + image_height * 3;
const colour_space_row = canvas_height_margin * 5 + image_height * 5;

// Constant to store text positionings
const text_column_1 = (canvas_width_margin * 2 + image_width) / 2;
const text_column_2 = canvas_width_margin + image_width + text_column_1;
const text_column_3 = canvas_width_margin * 2 + image_width * 2 + text_column_1;
const text_column_4 = canvas_width_margin * 3 + image_width * 3 + text_column_1;
    
const text_row_1 = canvas_height_margin - canvas_width_margin;
const text_row_2 = image_height + canvas_height_margin * 2 - canvas_width_margin / 2;
const text_row_3 = image_height * 2 + canvas_height_margin * 3 - canvas_width_margin / 2;
const text_row_4 = image_height * 3+ canvas_height_margin * 4 - canvas_width_margin / 2;
const text_row_5 = image_height * 4 + canvas_height_margin * 5 - canvas_width_margin / 2;

// Declaring variables
let webcam_preview;
let webcam_capture;
let capture_button;
let red_channel_slider;
let blue_channel_slider;
let green_channel_slider;
let smy_slider;
let ycbcr_slider;

// Declaring variables for face detection
var faces;
var detector;
let face_bound;
let saved_frame;
var detect_video;
var detect_frame;
var another_video;
var detected_face = false;
var classifier = objectdetect.frontalface;
var foreground;

// Extension page variables
var extension_page = false;
var player_head;
var faces_ex;
var extension_detect = false;
var score = 0;
var timer = 0;
var coins = [];
var fastest_time;

var coins_drawn = false;
var start_state = false;

const extension_video_y = image_row_1 * 2;
const extension_video_width = image_width * 4;
const extension_video_x = image_column_2 * 0.8;
const extension_video_height = image_height * 4;