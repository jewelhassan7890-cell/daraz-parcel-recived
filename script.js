// const photoInput =
//     document.getElementById("photo");

// const previewImage =
//     document.getElementById("previewImage");

// const form =
//     document.querySelector("form");


// // Image Preview

// photoInput.addEventListener("change", function () {

//     const file = this.files[0];

//     if (file) {

//         const reader = new FileReader();

//         reader.onload = function (e) {

//             previewImage.src = e.target.result;

//             previewImage.style.display = "block";
//         };

//         reader.readAsDataURL(file);
//     }
// });


// // Submit Form

// form.addEventListener("submit", function (e) {

//     e.preventDefault();

//     const file = photoInput.files[0];

//     const reader = new FileReader();

//     reader.onloadend = async function () {

//         const formData = {

//             photo: reader.result,

//             receiverName:
//                 document.getElementById("receiverName").value,

//             trackingNumber:
//                 document.getElementById("trackingNumber").value,

//             phoneNubmer:
//                 document.getElementById("phoneNubmer").value
//         };

//         try {

//             const response = await fetch(
//                 "https://script.google.com/macros/s/AKfycbyUnYtIB9vHAHzyhd7D7V0VhhKm-ShxC9cqcTBHl_kpTNfu08VgF6DLWyJy1uxQRCav/exec",
//                 {
//                     method: "POST",

//                     body: JSON.stringify(formData)
//                 }
//             );

//             const result =
//                 await response.json();

//             if (result.result === "success") {

//                 alert("Data saved successfully!");

//                 form.reset();

//                 previewImage.style.display = "none";
//             }

//         } catch (error) {

//             alert("Upload failed!");
//         }
//     };

//     reader.readAsDataURL(file);
// });

const openCameraBtn =
    document.getElementById("openCameraBtn");

const cameraBox =
    document.getElementById("cameraBox");

const video =
    document.getElementById("video");

const canvas =
    document.getElementById("canvas");

const captureBtn =
    document.getElementById("captureBtn");

const previewImage =
    document.getElementById("previewImage");

const form =
    document.querySelector("form");

let capturedPhoto = "";


// Open Camera

openCameraBtn.addEventListener("click", async function () {

    cameraBox.style.display = "block";

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment"
                },
                audio: false
            });

        video.srcObject = stream;

    } catch (error) {

        alert("Camera permission denied!");
    }
});


// Capture Photo

captureBtn.addEventListener("click", function () {

    const context =
        canvas.getContext("2d");

    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;

    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    capturedPhoto =
        canvas.toDataURL("image/png");

    previewImage.src =
        capturedPhoto;

    previewImage.style.display =
        "block";

    // Stop Camera After Capture

    const stream =
        video.srcObject;

    const tracks =
        stream.getTracks();

    tracks.forEach(track => track.stop());

    cameraBox.style.display =
        "none";
});


// Submit Form

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (!capturedPhoto) {

        alert("Please capture photo!");

        return;
    }

    const formData = {

        photo: capturedPhoto,

        receiverName:
            document.getElementById("receiverName").value,

        trackingNumber:
            document.getElementById("trackingNumber").value,

        phoneNubmer:
            document.getElementById("phoneNubmer").value
    };

    try {

        const response =
            await fetch(
                "https://script.google.com/macros/s/AKfycbwDKuSKlCHfTMIbmh__bmvf5g-h2vc93lKKztvk8p6ipt7YpeYeKH3pLoNRurlFUtFV/exec",
                {
                    method: "POST",
                    body: JSON.stringify(formData)
                }
            );

        const result =
            await response.json();

        if (result.result === "success") {

            alert("Data saved successfully!");

            form.reset();

            previewImage.style.display =
                "none";

            capturedPhoto = "";
        }

    } catch (error) {

        alert("Upload failed!");
    }
});