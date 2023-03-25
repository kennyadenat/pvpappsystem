require('dotenv').config();
const postEmail = require('./postEmail');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const {
  url
} = require('gravatar');


const {
  FRONTEND_URL_EMAIL_VERIFICATION,
  FRONTEND_URL_SUPPORTS,
  FRONTEND_URL_TICKETS,
  APP_LOGO,
  sender_email,
  sendinblue_api
} = process.env;

const {
  SendEmail
} = postEmail;


/**
 * @exports
 * @class EmailVerification
 */
class EmailHelper {

  /**
   *
   * @static   
   * @param {string} email - recipient of the email
   * @param {string} firstname - name of the recipient
   * @param {string} verifyToken - verification token
   * @memberof NewSupportConversation
   * @returns {function} - returns a function call
   */
  static async NewSupportConversation(req, res) {

    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = sendinblue_api;

    // const urls = `${FRONTEND_URL_EMAIL_VERIFICATION}?email=${email}&token=${verifyToken}`;
    const conversations = `${FRONTEND_URL_SUPPORTS}?email=${req.body.email}&ticket=${req.body.ticket_number}`;
    const tickets = `${FRONTEND_URL_TICKETS}?email=${req.body.email}&ticket=${req.body.ticket_number}`;

    const contents = `<!DOCTYPE html>
<html lang="en">

<head>
  <base href="/" />
  <title>PVP Office, Nigeria - Support</title>
</head>

<body id="kt_body" class="app-blank">
  <div class="d-flex flex-column flex-root">
    <div class="d-flex flex-column flex-column-fluid">
      <div class="scroll-y flex-column-fluid px-10 py-10" data-kt-scroll="true" data-kt-scroll-activate="true"
        data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_header_nav" data-kt-scroll-offset="5px"
        data-kt-scroll-save-state="true"
        style="background-color:#000; --kt-scrollbar-color: #d9d0cc; --kt-scrollbar-hover-color: #d9d0cc">
        <style>
          html,
          body {
            padding: 0;
            margin: 0;
            background-color: #F7F2EF;
            font-family: Inter, Helvetica, "sans-serif";
          }

          a:hover {
            color: #009ef7;
          }

        </style>
        <div id="#kt_app_body_content"
          style="background-color:#F7F2EF; font-family:Arial,Helvetica,sans-serif; line-height: 1.5; min-height: 100%; font-weight: normal; font-size: 15px; color: #2F3044; margin:0; padding:0; width:100%;">
          <div
            style="background-color:#ffffff; padding: 45px 0 34px 0; border-radius: 24px; margin:40px auto; max-width: 600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" height="auto"
              style="border-collapse:collapse">
              <tbody>
                <tr>
                  <td align="center" valign="center" style="text-align:center; padding-bottom: 10px">
                    <div style="margin-bottom:45px; text-align:left">
                      <div style="margin:-10px 60px 0px 60px; text-align:center;">
                        <a rel="noopener" target="_blank">
                          <img alt="Logo" src="http://localhost:4400/assets/img/pvp/pvp_logo.svg"
                            style="height: 120px" />
                        </a>
                      </div>
                      <div
                        style="font-size: 14px; text-align:center; font-weight: 500; margin:0 60px 38px 60px; font-family:Arial,Helvetica,sans-serif">
                        <p style="color:#181C32; font-size: 24px; font-weight:900; line-height:1.4; margin-bottom:1px">
                          PVP Office, Nigeria</p>
                        <p style="margin-bottom:2px; color:#3F4254; line-height:1.6">Promoting increased staple crop
                          productivity for smallholder farmers in Nigeria.</p>
                      </div>
                      <div style="margin-bottom: 45px;">
                        <img alt="" style="width:100%"
                          src="file:///C:/Users/Adelugba%20Kehinde/Documents/themes/metronic_html_v8.1.2_demo13/metronic_html_v8.1.2_demo13/demo13/dist/assets/media/email/img-1.png">
                      </div>
                      <div style="font-size:14px; text-align:left; text-align: justify !important; font-weight:500;
                        margin:0 60px 33px 60px; font-family:Arial,Helvetica,sans-serif">
                        <p style="color:#04115c; font-size: 18px; font-weight:600; margin-bottom:27px;">
                          Hey ${req.body.fullname},</p>
                        <p style="color:#3F4254; line-height:1.6">Thanks for reaching out to the Plant Variety
                          Protection Office, Nigeria. We are happy to help you in the best possible way we can. <br><br>
                          We have received your message with subject title <span style="font-weight:700">${req.body.title}</span>
                          on our support experience platform and our technical team is currently attending to your
                          enquiry or request at the moment and we will ensure we promptly respond to
                          your message within the shortest possible time depneding on the complexity of your request.
                          <br><br>
                          Your request has been logged with us and your ticket number is <span
                            style="font-weight:700">${req.body.ticket_number}</span>. Please kindly click on the view converstions button
                          below to track conversations with
                          our
                          support team on your request</p>
                      </div>
                      <a href="${conversations}"
                        target="_blank" style="background-color:#50cd89; border-radius:6px; display:inline-block; margin-left:60px; margin-bottom: 20px;;
                        padding:11px 19px; color: #FFFFFF; font-size: 14px; font-weight:500;
                        font-family:Arial,Helvetica,sans-serif; text-decoration: auto;">View Conversations
                      </a>
                      <div
                        style="font-size:14px; text-align:left; font-weight:500; margin:0 60px 33px 60px; font-family:Arial,Helvetica,sans-serif">
                        <p style="color:#3F4254; line-height:1.6">If you are interested in tracking your previous
                          tickets on this platform, please kindly click on the button below to view your tickets</p>
                      </div>
                      <a href="${tickets}"
                        target="_blank" style="background-color:#50cd89; border-radius:6px; display:inline-block; margin-left:60px;
                        padding:11px 19px; color: #FFFFFF; font-size: 14px; font-weight:500;
                        font-family:Arial,Helvetica,sans-serif; text-decoration: auto;">View Support Tickets
                      </a>
                    </div>
                  </td>
                </tr>
                <tr style="display: flex; justify-content: center; margin:0 60px 35px 60px">
                  <td align="start" valign="start" style="padding-bottom: 10px;">
                    <p style="color:#181C32; font-size: 18px; font-weight: 600; margin-bottom:13px">PVP Resources</p>
                    <div style="background: #F9F9F9; border-radius: 12px; padding:35px 30px">
                      <div style="display:flex">
                        <div
                          style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
                          <span class="svg-icon svg-icon-3 svg-icon-success">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24" />
                                <path
                                  d="M8,3 L8,3.5 C8,4.32842712 8.67157288,5 9.5,5 L14.5,5 C15.3284271,5 16,4.32842712 16,3.5 L16,3 L18,3 C19.1045695,3 20,3.8954305 20,5 L20,21 C20,22.1045695 19.1045695,23 18,23 L6,23 C4.8954305,23 4,22.1045695 4,21 L4,5 C4,3.8954305 4.8954305,3 6,3 L8,3 Z"
                                  fill="#50cd89" opacity="0.3" />
                                <path
                                  d="M10.875,15.75 C10.6354167,15.75 10.3958333,15.6541667 10.2041667,15.4625 L8.2875,13.5458333 C7.90416667,13.1625 7.90416667,12.5875 8.2875,12.2041667 C8.67083333,11.8208333 9.29375,11.8208333 9.62916667,12.2041667 L10.875,13.45 L14.0375,10.2875 C14.4208333,9.90416667 14.9958333,9.90416667 15.3791667,10.2875 C15.7625,10.6708333 15.7625,11.2458333 15.3791667,11.6291667 L11.5458333,15.4625 C11.3541667,15.6541667 11.1145833,15.75 10.875,15.75 Z"
                                  fill="#50cd89" />
                                <path
                                  d="M11,2 C11,1.44771525 11.4477153,1 12,1 C12.5522847,1 13,1.44771525 13,2 L14.5,2 C14.7761424,2 15,2.22385763 15,2.5 L15,3.5 C15,3.77614237 14.7761424,4 14.5,4 L9.5,4 C9.22385763,4 9,3.77614237 9,3.5 L9,2.5 C9,2.22385763 9.22385763,2 9.5,2 L11,2 Z"
                                  fill="#50cd89" />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div>
                          <div>
                            <a href="#"
                              style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">Articles
                              on Plant Variety Protection</a>
                            <p
                              style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">
                              Provides you with all necessary information on various topics on plant breeder's right,
                              its importance and benefits to plant breeders</p>
                          </div>
                          <div class="separator separator-dashed" style="margin:17px 0 15px 0"></div>
                        </div>
                      </div>
                      <div style="display:flex">
                        <div
                          style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
                          <span class="svg-icon svg-icon-3 svg-icon-success">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <polygon points="0 0 24 0 24 24 0 24" />
                                <path
                                  d="M4.85714286,1 L11.7364114,1 C12.0910962,1 12.4343066,1.12568431 12.7051108,1.35473959 L17.4686994,5.3839416 C17.8056532,5.66894833 18,6.08787823 18,6.52920201 L18,19.0833333 C18,20.8738751 17.9795521,21 16.1428571,21 L4.85714286,21 C3.02044787,21 3,20.8738751 3,19.0833333 L3,2.91666667 C3,1.12612489 3.02044787,1 4.85714286,1 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z"
                                  fill="#009ef7" fill-rule="nonzero" opacity="0.3" />
                                <path
                                  d="M6.85714286,3 L14.7364114,3 C15.0910962,3 15.4343066,3.12568431 15.7051108,3.35473959 L20.4686994,7.3839416 C20.8056532,7.66894833 21,8.08787823 21,8.52920201 L21,21.0833333 C21,22.8738751 20.9795521,23 19.1428571,23 L6.85714286,23 C5.02044787,23 5,22.8738751 5,21.0833333 L5,4.91666667 C5,3.12612489 5.02044787,3 6.85714286,3 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z"
                                  fill="#009ef7" fill-rule="nonzero" />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div>
                          <div>
                            <a href="#"
                              style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">PVP
                              Technical Documents</a>
                            <p
                              style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">
                              Get access to technical documents on various procedures and guidelines for crop when
                              filing for plant breeder's right
                            </p>
                          </div>
                          <div class="separator separator-dashed" style="margin:17px 0 15px 0"></div>
                        </div>
                      </div>
                      <div style="display:flex">
                        <div
                          style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
                          <span class="svg-icon svg-icon-3 svg-icon-success">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#ffc700" opacity="0.3" cx="12" cy="12" r="10" />
                                <path
                                  d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z"
                                  fill="#ffc700" />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div>
                          <div>
                            <a href="#"
                              style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">Frequently
                              Asked Questions (FAQs)
                            </a>
                            <p
                              style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">
                              Provides answers to some Frequently Asked Questions (FAQs) about PVP that we often get
                              from various stakeholders
                            </p>
                          </div>
                          <div class="separator separator-dashed" style="margin:17px 0 15px 0"></div>
                        </div>
                      </div>
                      <div style="display:flex">
                        <div
                          style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
                          <span class="svg-icon svg-icon-3 svg-icon-success">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24" />
                                <polygon fill="#7239ea" opacity="0.3" points="6 7 6 15 18 15 18 7" />
                                <path
                                  d="M11,19 L11,16 C11,15.4477153 11.4477153,15 12,15 C12.5522847,15 13,15.4477153 13,16 L13,19 L14.5,19 C14.7761424,19 15,19.2238576 15,19.5 C15,19.7761424 14.7761424,20 14.5,20 L9.5,20 C9.22385763,20 9,19.7761424 9,19.5 C9,19.2238576 9.22385763,19 9.5,19 L11,19 Z"
                                  fill="#7239ea" opacity="0.3" />
                                <path
                                  d="M6,7 L6,15 L18,15 L18,7 L6,7 Z M6,5 L18,5 C19.1045695,5 20,5.8954305 20,7 L20,15 C20,16.1045695 19.1045695,17 18,17 L6,17 C4.8954305,17 4,16.1045695 4,15 L4,7 C4,5.8954305 4.8954305,5 6,5 Z"
                                  fill="#7239ea" fill-rule="nonzero" />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div>
                          <div>
                            <a href="#"
                              style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">PVP
                              Office Blog
                            </a>
                            <p
                              style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">
                              Our blog provides you with information and insights from various thought leaders in the
                              industry as they share their knowledge and opinions about PVP and its potentials to the
                              agricultural sector.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="center"
                    style="font-size: 13px; text-align:center; padding: 0 10px 10px 10px; font-weight: 500; color: #A1A5B7; font-family:Arial,Helvetica,sans-serif">
                    <p style="color:#181C32; font-size: 16px; font-weight: 600; margin-bottom:9px">We are always ready
                      to meet your needs and enquiries!</p>
                    <p style="margin-bottom:2px">Call our support care line: +31 6 3344 55 56</p>
                    <p style="margin-bottom:4px">You may reach us at
                      <a href="https://keenthemes.com" rel="noopener" target="_blank"
                        style="font-weight: 600">support@pvp.ng</a>.</p>
                    <p>We are always open Mon-Fri, 9AM-18AM</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="center" style="text-align:center; padding-bottom: 20px;">
                    <a target="_blank" href="https://www.facebook.com/pvpofficeng"
                      style="margin-right:20px;text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="30"
                          viewBox="88.428 12.828 107.543 207.085">
                          <path
                            d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
                            fill="#3c5a9a" /></svg>
                      </span>
                    </a>
                    <a target="_blank" href="https://www.instagram.com/pvp_ng/"
                      style="margin-right:20px;text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3364.7 3364.7" width="30" height="30">
                          <defs>
                            <radialGradient id="0" cx="217.76" cy="3290.99" r="4271.92" gradientUnits="userSpaceOnUse">
                              <stop offset=".09" stop-color="#fa8f21" />
                              <stop offset=".78" stop-color="#d82d7e" />
                            </radialGradient>
                            <radialGradient id="1" cx="2330.61" cy="3182.95" r="3759.33" gradientUnits="userSpaceOnUse">
                              <stop offset=".64" stop-color="#8c3aaa" stop-opacity="0" />
                              <stop offset="1" stop-color="#8c3aaa" />
                            </radialGradient>
                          </defs>
                          <path
                            d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
                            fill="url(#0)" />
                          <path
                            d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
                            fill="url(#1)" />
                          <path
                            d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57"
                            fill="#fff" />
                        </svg>
                      </span>
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/company/pvpofficeng"
                      style="margin-right:20px;text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="114" height="30"
                          viewBox="1.786 1.783 287.865 76.248">
                          <path
                            d="M213.882 7.245c0-3.015 2.508-5.462 5.6-5.462h64.568c3.093 0 5.6 2.447 5.6 5.462V72.57c0 3.016-2.507 5.461-5.6 5.461h-64.568c-3.092 0-5.6-2.445-5.6-5.46V7.244z"
                            fill="#069" />
                          <path
                            d="M1.785 65.652h31.62V55.27H13.23V15.665H1.785v49.987zM49.414 65.652v-34.43H37.97v34.43h11.444zm-5.721-39.13c3.99 0 6.474-2.644 6.474-5.95-.074-3.378-2.484-5.947-6.398-5.947-3.915 0-6.475 2.57-6.475 5.947 0 3.306 2.484 5.95 6.324 5.95h.075zM54.727 65.652h11.444V46.424c0-1.029.074-2.058.377-2.791.826-2.056 2.709-4.186 5.871-4.186 4.142 0 5.799 3.158 5.799 7.784v18.42H89.66V45.91c0-10.576-5.646-15.497-13.176-15.497-6.173 0-8.884 3.451-10.39 5.802h.077v-4.993H54.727c.151 3.231 0 34.43 0 34.43zM105.805 15.665H94.361v49.987h11.444V54.489l2.86-3.601 8.96 14.764h14.078l-15.056-21.373 13.174-14.54h-13.776s-9.411 13.008-10.24 14.552V15.665z" />
                          <path
                            d="M162.306 51.29c.151-.884.377-2.58.377-4.498 0-8.9-4.518-17.936-16.413-17.936-12.724 0-18.597 10.063-18.597 19.19 0 11.288 7.153 18.337 19.65 18.337 4.97 0 9.561-.732 13.327-2.275l-1.506-7.558c-3.088 1.024-6.25 1.537-10.164 1.537-5.345 0-10.012-2.195-10.389-6.871l23.715.072v.002zm-23.79-7.742c.301-2.938 2.26-7.273 7.153-7.273 5.194 0 6.4 4.628 6.4 7.273h-13.552zM190.93 15.665v17.304h-.151c-1.657-2.422-5.12-4.038-9.71-4.038-8.81 0-16.564 7.05-16.49 19.094 0 11.164 7.003 18.435 15.735 18.435 4.744 0 9.26-2.058 11.52-6.024h.225l.453 5.216h10.163c-.15-2.424-.302-6.61-.302-10.723V15.664h-11.444zm0 34.05c0 .88-.075 1.763-.227 2.495-.675 3.16-3.386 5.361-6.699 5.361-4.742 0-7.83-3.818-7.83-9.84 0-5.654 2.637-10.208 7.906-10.208 3.538 0 6.022 2.423 6.7 5.433.15.663.15 1.398.15 2.058v4.7z" />
                          <path
                            d="M236.85 65.61V31.18h-11.444v34.43h11.445zm-5.72-39.13c3.99 0 6.474-2.644 6.474-5.948-.075-3.379-2.484-5.949-6.398-5.949-3.917 0-6.475 2.57-6.475 5.949 0 3.304 2.483 5.948 6.324 5.948h.074zM243.184 65.61h11.443V46.385c0-1.028.075-2.058.377-2.792.827-2.057 2.71-4.186 5.872-4.186 4.14 0 5.797 3.157 5.797 7.786V65.61h11.443V45.869c0-10.575-5.645-15.496-13.174-15.496-6.173 0-8.884 3.45-10.39 5.8h.076v-4.992h-11.443c.149 3.23-.001 34.43-.001 34.43z"
                            fill="#fff" /></svg>
                      </span>
                    </a>
                    <a target="_blank" href="https://vimeo.com/user147596419"
                      style="margin-right:20px;text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg width="30" height="34" viewBox="0 -32 512.0001 512" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="m507.214844 126.574219c-4.992188 22.652343-13.480469 44.96875-25.210938 66.324219-32.53125 59.199218-108.800781 184.054687-197.363281 234.21875-18.980469 10.761718-38.539063 18.089843-58.351563 20.597656l-.9375.117187h-1.128906c-4.492187 0-20.65625-1.796875-39.835937-24.941406-22.257813-26.855469-41.445313-73.144531-57.042969-137.585937l-.027344-.136719c-.203125-.839844-19.761718-84.378907-49.304687-143.738281l-.210938-.449219c-.050781-.109375-5.480469-11.660157-18.21875-11.660157-7.308593 0-15.617187 3.652344-24.703125 10.863282-9.195312 7.308594-22.296875 5.988281-29.824218-2.988282-7.207032-8.605468-6.648438-21.066406 1.308593-28.984374 22.585938-22.484376 69.582031-69.261719 106.015625-87.722657 2.816406-1.429687 5.808594-2.675781 9.144532-3.804687h.011718c18.871094-6.378906 39.027344-4.890625 56.761719 4.175781 17.632813 9.015625 30.542969 24.371094 36.371094 43.242187 3.386719 10.960938 6.070312 23.53125 8 37.378907l.027343.210937c2.964844 23.84375 9.464844 69.863282 19.710938 110.167969 15.886719 62.464844 30.300781 70.992187 33.027344 72.058594l.25.109375c.03125.011718.789062.320312 2.207031.320312 2.046875 0 4.292969-.378906 6.75-1.289062 15.335937-5.648438 38.769531-31.777344 71.078125-113.703125l.0625-.136719c.089844-.210938.078125-.210938.429688-1.089844l.707031-1.855468c1.757812-4.523438 2.734375-9.085938 2.914062-13.5625.261719-6.609376-.617187-16.035157-6.289062-23.382813-6.597657-8.535156-17.664063-12.28125-33.816407-11.390625-7.617187.417969-14.71875-3.136719-18.972656-9.496094s-4.820312-14.269531-1.527344-21.167968c10.175782-21.285157 27.707032-42.152344 48.105469-57.25 26.53125-19.640626 58.070313-30.023438 91.207031-30.023438h.113282c1.507812.0195312 37.082031.648438 59.148437 33.546875 14.945313 22.296875 18.109375 53.597656 9.414063 93.027344zm0 0"
                            fill="#6aa9ff" />
                          <path
                            d="m507.214844 126.574219c-4.992188 22.652343-13.480469 44.96875-25.210938 66.324219-32.53125 59.199218-108.800781 184.054687-197.363281 234.21875v-144.058594c15.335937-5.648438 38.769531-31.777344 71.078125-113.703125l.0625-.136719c.089844-.210938.078125-.210938.429688-1.089844l.707031-1.855468c1.757812-4.523438 2.734375-9.085938 2.914062-13.5625.261719-6.609376-.617187-16.035157-6.289062-23.382813-6.597657-8.535156-17.664063-12.28125-33.816407-11.390625-7.617187.417969-14.71875-3.136719-18.972656-9.496094s-4.820312-14.269531-1.527344-21.167968c10.175782-21.285157 27.707032-42.152344 48.105469-57.25 26.53125-19.640626 58.070313-30.023438 91.207031-30.023438h.113282c1.507812.0195312 37.082031.648438 59.148437 33.546875 14.945313 22.296875 18.109375 53.597656 9.414063 93.027344zm0 0"
                            fill="#2682ff" /></svg>
                      </span>
                    </a>
                    <a target="_blank" href="https://www.youtube.com/channel/UCpQEFQ9f2EeoOtdBMrL3JrQ"
                      style="text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg height="34" viewBox="0 .03 2498 2502.47" width="30" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="m0 1864.11v.11c1.5 55.5 2 111.32 11.32 166.47 9.92 58.35 24.1 115.25 51.15 168.21q54.86 107.52 150.21 181.66c45.52 35.5 95.25 63.69 150.3 81.47 80.26 25.89 163.07 35.81 247.09 36.3 52.42.33 104.81 1.64 157.25 1.42 380.82-1.6 761.65 2.75 1142.49-2.35 50.53-.68 100.24-6.85 149.84-15.92 95.06-17.4 179.07-58 250.95-122.09 83.77-74.71 140.29-166.16 165.81-276.52 16.69-72.14 20.87-145.32 21.58-218.77v-14.65c0-5.68-2.16-1247.91-2.36-1264.33-.55-45.1-3.88-89.87-12.33-134.25-10.29-54.08-24.82-106.78-50.71-155.7-27.35-51.7-61.6-98.17-104-138.79-64.89-62.23-139.78-106.23-227-129.51-78.74-21-159.07-25.68-240-25.6a2.45 2.45 0 0 1 -.45-1.24h-1224.74c0 .42 0 .83-.07 1.24-45.93.84-91.92.49-137.61 6.16-50.05 6.22-99.63 15.59-147 33.09-74.62 27.6-139.46 70.59-194.84 128-62.75 65-107 140.22-130.44 227.79-20.95 78.13-25.51 157.81-25.62 238.06"
                            fill="#fff" />
                          <path d="m0 .79h2498v2498h-2498z" fill="none" />
                          <path
                            d="m1293.24 1938.65-409.54-7.49c-132.6-2.61-265.53 2.6-395.53-24.44-197.76-40.4-211.77-238.49-226.43-404.65-20.2-233.6-12.38-471.44 25.74-703.09 21.52-129.98 106.21-207.54 237.18-215.98 442.12-30.63 887.18-27 1328.32-12.71 46.59 1.31 93.5 8.47 139.44 16.62 226.77 39.75 232.3 264.23 247 453.2 14.66 190.92 8.47 382.82-19.55 572.44-22.48 157-65.49 288.66-247 301.37-227.42 16.62-449.62 30-677.68 25.74.01-1.01-1.3-1.01-1.95-1.01zm-240.77-397.48c171.38-98.4 339.49-195.16 509.89-292.9-171.7-98.4-339.49-195.16-509.89-292.9z"
                            fill="#f00" /></svg>
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="center"
                    style="font-size: 13px; padding:0 15px; text-align:center; font-weight: 500; color: #A1A5B7;font-family:Arial,Helvetica,sans-serif">
                    <p>&copy; Copyright. All Rights Reserved.
                      <a href="https://keenthemes.com" rel="noopener" target="_blank"
                        style="font-weight: 600;font-family:Arial,Helvetica,sans-serif">PVP Office, Nigeria</a>&nbsp;
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>
`;

    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      'subject': req.body.title,
      'sender': {
        'email': 'pvpofficeng@gmail.com',
        'name': 'Plant Variety Protection Office'
      },
      'replyTo': {
        'email': 'pvpofficeng@gmail.com',
        'name': 'Plant Variety Protection Office'
      },
      'to': [{
        'name': `${req.body.fullname}`,
        'email': `${req.body.email}`
      }],
      'htmlContent': `${contents}`
    }).then((data) => {
      // return next({
      //   success: data
      // });
    }, (error) => {
      // return next({
      //   err: error
      // });
    });

  }


  /**
   *
   * @static   
   * @param {string} email - recipient of the email
   * @param {string} firstname - name of the recipient
   * @param {string} verifyToken - verification token
   * @memberof NewSupportConversation
   * @returns {function} - returns a function call
   */
  static async SupportConversationtThread(req, res) {

    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = sendinblue_api;

    // const urls = `${FRONTEND_URL_EMAIL_VERIFICATION}?email=${email}&token=${verifyToken}`;
    const conversations = `${FRONTEND_URL_SUPPORTS}?email=${req.body.email}&ticket=${req.body.ticket_number}`;
    const tickets = `${FRONTEND_URL_TICKETS}?email=${req.body.email}&ticket=${req.body.ticket_number}`;

    const contents = `<!DOCTYPE html>
<html lang="en">

<head>
  <base href="/" />
  <title>PVP Office, Nigeria - Support</title>
</head>

<body id="kt_body" class="app-blank">
  <div class="d-flex flex-column flex-root">
    <div class="d-flex flex-column flex-column-fluid">
      <div class="scroll-y flex-column-fluid px-10 py-10" data-kt-scroll="true" data-kt-scroll-activate="true"
        data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_header_nav" data-kt-scroll-offset="5px"
        data-kt-scroll-save-state="true"
        style="background-color:#000; --kt-scrollbar-color: #d9d0cc; --kt-scrollbar-hover-color: #d9d0cc">
        <style>
          html,
          body {
            padding: 0;
            margin: 0;
            background-color: #F7F2EF;
            font-family: Inter, Helvetica, "sans-serif";
          }

          a:hover {
            color: #009ef7;
          }

        </style>
        <div id="#kt_app_body_content"
          style="background-color:#F7F2EF; font-family:Arial,Helvetica,sans-serif; line-height: 1.5; min-height: 100%; font-weight: normal; font-size: 15px; color: #2F3044; margin:0; padding:0; width:100%;">
          <div
            style="background-color:#ffffff; padding: 45px 0 34px 0; border-radius: 24px; margin:40px auto; max-width: 600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" height="auto"
              style="border-collapse:collapse">
              <tbody>
                <tr>
                  <td align="center" valign="center" style="text-align:center; padding-bottom: 10px">
                    <div style="margin-bottom:45px; text-align:left">
                      <div style="margin:-10px 60px 0px 60px; text-align:center;">
                        <a rel="noopener" target="_blank">
                          <img alt="Logo" src="http://localhost:4400/assets/img/pvp/pvp_logo.svg"
                            style="height: 120px" />
                        </a>
                      </div>
                      <div
                        style="font-size: 14px; text-align:center; font-weight: 500; margin:0 60px 38px 60px; font-family:Arial,Helvetica,sans-serif">
                        <p style="color:#181C32; font-size: 24px; font-weight:900; line-height:1.4; margin-bottom:1px">
                          PVP Office, Nigeria</p>
                        <p style="margin-bottom:2px; color:#3F4254; line-height:1.6">Promoting increased staple crop
                          productivity for smallholder farmers in Nigeria.</p>
                      </div>
                      <div style="margin-bottom: 45px;">
                        <img alt="" style="width:100%"
                          src="file:///C:/Users/Adelugba%20Kehinde/Documents/themes/metronic_html_v8.1.2_demo13/metronic_html_v8.1.2_demo13/demo13/dist/assets/media/email/img-1.png">
                      </div>
                      <div style="font-size:14px; text-align:left; text-align: justify !important; font-weight:500;
                        margin:0 60px 33px 60px; font-family:Arial,Helvetica,sans-serif">
                        <p style="color:#04115c; font-size: 18px; font-weight:600; margin-bottom:27px;">
                          Hey Esther,</p>
                        <p style="color:#3F4254; line-height:1.6">You have received a new message to your support
                          request with subject title <span style="font-weight:700">5g9kOQO</span> and ticket number
                          <span style="font-weight:700">5g9kOQO</span> from our support experience platform. <br><br>
                          Please kindly click on the view
                          converstions button below to track conversations with our support team on your request</p>
                      </div>
                      <a href="http://localhost:4200/support/conversations?email=kennyadenat09@gmail.com&ticket=5g9kOQO"
                        target="_blank" style="background-color:#50cd89; border-radius:6px; display:inline-block; margin-left:60px; margin-bottom: 20px;;
                        padding:11px 19px; color: #FFFFFF; font-size: 14px; font-weight:500;
                        font-family:Arial,Helvetica,sans-serif; text-decoration: auto;">View Conversations
                      </a>
                      <div
                        style="font-size:14px; text-align:left; font-weight:500; margin:0 60px 33px 60px; font-family:Arial,Helvetica,sans-serif">
                        <p style="color:#3F4254; line-height:1.6">If you are interested in tracking your previous
                          tickets on this platform, please kindly click on the button below to view your tickets</p>
                      </div>
                      <a href="http://localhost:4200/support/tickets?email=kennyadenat09@gmail.com&ticket=5g9kOQO"
                        target="_blank" style="background-color:#50cd89; border-radius:6px; display:inline-block; margin-left:60px;
                        padding:11px 19px; color: #FFFFFF; font-size: 14px; font-weight:500;
                        font-family:Arial,Helvetica,sans-serif; text-decoration: auto;">View Support Tickets
                      </a>
                    </div>
                  </td>
                </tr>
                <tr style="display: flex; justify-content: center; margin:0 60px 35px 60px">
                  <td align="start" valign="start" style="padding-bottom: 10px;">
                    <p style="color:#181C32; font-size: 18px; font-weight: 600; margin-bottom:13px">PVP Resources</p>
                    <div style="background: #F9F9F9; border-radius: 12px; padding:35px 30px">
                      <div style="display:flex">
                        <div
                          style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
                          <span class="svg-icon svg-icon-3 svg-icon-success">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24" />
                                <path
                                  d="M8,3 L8,3.5 C8,4.32842712 8.67157288,5 9.5,5 L14.5,5 C15.3284271,5 16,4.32842712 16,3.5 L16,3 L18,3 C19.1045695,3 20,3.8954305 20,5 L20,21 C20,22.1045695 19.1045695,23 18,23 L6,23 C4.8954305,23 4,22.1045695 4,21 L4,5 C4,3.8954305 4.8954305,3 6,3 L8,3 Z"
                                  fill="#50cd89" opacity="0.3" />
                                <path
                                  d="M10.875,15.75 C10.6354167,15.75 10.3958333,15.6541667 10.2041667,15.4625 L8.2875,13.5458333 C7.90416667,13.1625 7.90416667,12.5875 8.2875,12.2041667 C8.67083333,11.8208333 9.29375,11.8208333 9.62916667,12.2041667 L10.875,13.45 L14.0375,10.2875 C14.4208333,9.90416667 14.9958333,9.90416667 15.3791667,10.2875 C15.7625,10.6708333 15.7625,11.2458333 15.3791667,11.6291667 L11.5458333,15.4625 C11.3541667,15.6541667 11.1145833,15.75 10.875,15.75 Z"
                                  fill="#50cd89" />
                                <path
                                  d="M11,2 C11,1.44771525 11.4477153,1 12,1 C12.5522847,1 13,1.44771525 13,2 L14.5,2 C14.7761424,2 15,2.22385763 15,2.5 L15,3.5 C15,3.77614237 14.7761424,4 14.5,4 L9.5,4 C9.22385763,4 9,3.77614237 9,3.5 L9,2.5 C9,2.22385763 9.22385763,2 9.5,2 L11,2 Z"
                                  fill="#50cd89" />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div>
                          <div>
                            <a href="#"
                              style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">Articles
                              on Plant Variety Protection</a>
                            <p
                              style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">
                              Provides you with all necessary information on various topics on plant breeder's right,
                              its importance and benefits to plant breeders</p>
                          </div>
                          <div class="separator separator-dashed" style="margin:17px 0 15px 0"></div>
                        </div>
                      </div>
                      <div style="display:flex">
                        <div
                          style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
                          <span class="svg-icon svg-icon-3 svg-icon-success">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <polygon points="0 0 24 0 24 24 0 24" />
                                <path
                                  d="M4.85714286,1 L11.7364114,1 C12.0910962,1 12.4343066,1.12568431 12.7051108,1.35473959 L17.4686994,5.3839416 C17.8056532,5.66894833 18,6.08787823 18,6.52920201 L18,19.0833333 C18,20.8738751 17.9795521,21 16.1428571,21 L4.85714286,21 C3.02044787,21 3,20.8738751 3,19.0833333 L3,2.91666667 C3,1.12612489 3.02044787,1 4.85714286,1 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z"
                                  fill="#009ef7" fill-rule="nonzero" opacity="0.3" />
                                <path
                                  d="M6.85714286,3 L14.7364114,3 C15.0910962,3 15.4343066,3.12568431 15.7051108,3.35473959 L20.4686994,7.3839416 C20.8056532,7.66894833 21,8.08787823 21,8.52920201 L21,21.0833333 C21,22.8738751 20.9795521,23 19.1428571,23 L6.85714286,23 C5.02044787,23 5,22.8738751 5,21.0833333 L5,4.91666667 C5,3.12612489 5.02044787,3 6.85714286,3 Z M8,12 C7.44771525,12 7,12.4477153 7,13 C7,13.5522847 7.44771525,14 8,14 L15,14 C15.5522847,14 16,13.5522847 16,13 C16,12.4477153 15.5522847,12 15,12 L8,12 Z M8,16 C7.44771525,16 7,16.4477153 7,17 C7,17.5522847 7.44771525,18 8,18 L11,18 C11.5522847,18 12,17.5522847 12,17 C12,16.4477153 11.5522847,16 11,16 L8,16 Z"
                                  fill="#009ef7" fill-rule="nonzero" />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div>
                          <div>
                            <a href="#"
                              style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">PVP
                              Technical Documents</a>
                            <p
                              style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">
                              Get access to technical documents on various procedures and guidelines for crop when
                              filing for plant breeder's right
                            </p>
                          </div>
                          <div class="separator separator-dashed" style="margin:17px 0 15px 0"></div>
                        </div>
                      </div>
                      <div style="display:flex">
                        <div
                          style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
                          <span class="svg-icon svg-icon-3 svg-icon-success">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24" />
                                <circle fill="#ffc700" opacity="0.3" cx="12" cy="12" r="10" />
                                <path
                                  d="M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M10.591,14.868 L10.591,13.209 L11.851,13.209 C13.447,13.209 14.602,11.991 14.602,10.395 C14.602,8.799 13.447,7.581 11.851,7.581 C10.234,7.581 9.121,8.799 9.121,10.395 L7.336,10.395 C7.336,7.875 9.31,5.922 11.851,5.922 C14.392,5.922 16.387,7.875 16.387,10.395 C16.387,12.915 14.392,14.868 11.851,14.868 L10.591,14.868 Z"
                                  fill="#ffc700" />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div>
                          <div>
                            <a href="#"
                              style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">Frequently
                              Asked Questions (FAQs)
                            </a>
                            <p
                              style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">
                              Provides answers to some Frequently Asked Questions (FAQs) about PVP that we often get
                              from various stakeholders
                            </p>
                          </div>
                          <div class="separator separator-dashed" style="margin:17px 0 15px 0"></div>
                        </div>
                      </div>
                      <div style="display:flex">
                        <div
                          style="display: flex; justify-content: center; align-items: center; width:40px; height:40px; margin-right:13px">
                          <span class="svg-icon svg-icon-3 svg-icon-success">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                              width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24" />
                                <polygon fill="#7239ea" opacity="0.3" points="6 7 6 15 18 15 18 7" />
                                <path
                                  d="M11,19 L11,16 C11,15.4477153 11.4477153,15 12,15 C12.5522847,15 13,15.4477153 13,16 L13,19 L14.5,19 C14.7761424,19 15,19.2238576 15,19.5 C15,19.7761424 14.7761424,20 14.5,20 L9.5,20 C9.22385763,20 9,19.7761424 9,19.5 C9,19.2238576 9.22385763,19 9.5,19 L11,19 Z"
                                  fill="#7239ea" opacity="0.3" />
                                <path
                                  d="M6,7 L6,15 L18,15 L18,7 L6,7 Z M6,5 L18,5 C19.1045695,5 20,5.8954305 20,7 L20,15 C20,16.1045695 19.1045695,17 18,17 L6,17 C4.8954305,17 4,16.1045695 4,15 L4,7 C4,5.8954305 4.8954305,5 6,5 Z"
                                  fill="#7239ea" fill-rule="nonzero" />
                              </g>
                            </svg>
                          </span>
                        </div>
                        <div>
                          <div>
                            <a href="#"
                              style="color:#181C32; font-size: 14px; font-weight: 600;font-family:Arial,Helvetica,sans-serif">PVP
                              Office Blog
                            </a>
                            <p
                              style="color:#5E6278; font-size: 13px; font-weight: 500; padding-top:3px; margin:0;font-family:Arial,Helvetica,sans-serif">
                              Our blog provides you with information and insights from various thought leaders in the
                              industry as they share their knowledge and opinions about PVP and its potentials to the
                              agricultural sector.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="center"
                    style="font-size: 13px; text-align:center; padding: 0 10px 10px 10px; font-weight: 500; color: #A1A5B7; font-family:Arial,Helvetica,sans-serif">
                    <p style="color:#181C32; font-size: 16px; font-weight: 600; margin-bottom:9px">We are always ready
                      to meet your needs and enquiries!</p>
                    <p style="margin-bottom:2px">Call our support care line: +31 6 3344 55 56</p>
                    <p style="margin-bottom:4px">You may reach us at
                      <a href="https://keenthemes.com" rel="noopener" target="_blank"
                        style="font-weight: 600">support@pvp.ng</a>.</p>
                    <p>We are always open Mon-Fri, 9AM-18AM</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="center" style="text-align:center; padding-bottom: 20px;">
                    <a target="_blank" href="https://www.facebook.com/pvpofficeng"
                      style="margin-right:20px;text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="30"
                          viewBox="88.428 12.828 107.543 207.085">
                          <path
                            d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
                            fill="#3c5a9a" /></svg>
                      </span>
                    </a>
                    <a target="_blank" href="https://www.instagram.com/pvp_ng/"
                      style="margin-right:20px;text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3364.7 3364.7" width="30" height="30">
                          <defs>
                            <radialGradient id="0" cx="217.76" cy="3290.99" r="4271.92" gradientUnits="userSpaceOnUse">
                              <stop offset=".09" stop-color="#fa8f21" />
                              <stop offset=".78" stop-color="#d82d7e" />
                            </radialGradient>
                            <radialGradient id="1" cx="2330.61" cy="3182.95" r="3759.33" gradientUnits="userSpaceOnUse">
                              <stop offset=".64" stop-color="#8c3aaa" stop-opacity="0" />
                              <stop offset="1" stop-color="#8c3aaa" />
                            </radialGradient>
                          </defs>
                          <path
                            d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
                            fill="url(#0)" />
                          <path
                            d="M853.2,3352.8c-200.1-9.1-308.8-42.4-381.1-70.6-95.8-37.3-164.1-81.7-236-153.5S119.7,2988.6,82.6,2892.8c-28.2-72.3-61.5-181-70.6-381.1C2,2295.4,0,2230.5,0,1682.5s2.2-612.8,11.9-829.3C21,653.1,54.5,544.6,82.5,472.1,119.8,376.3,164.3,308,236,236c71.8-71.8,140.1-116.4,236-153.5C544.3,54.3,653,21,853.1,11.9,1069.5,2,1134.5,0,1682.3,0c548,0,612.8,2.2,829.3,11.9,200.1,9.1,308.6,42.6,381.1,70.6,95.8,37.1,164.1,81.7,236,153.5s116.2,140.2,153.5,236c28.2,72.3,61.5,181,70.6,381.1,9.9,216.5,11.9,281.3,11.9,829.3,0,547.8-2,612.8-11.9,829.3-9.1,200.1-42.6,308.8-70.6,381.1-37.3,95.8-81.7,164.1-153.5,235.9s-140.2,116.2-236,153.5c-72.3,28.2-181,61.5-381.1,70.6-216.3,9.9-281.3,11.9-829.3,11.9-547.8,0-612.8-1.9-829.1-11.9"
                            fill="url(#1)" />
                          <path
                            d="M1269.25,1689.52c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7-416.6-186.59-416.6-416.7m-225.26,0c0,354.5,287.36,641.86,641.86,641.86s641.86-287.36,641.86-641.86-287.36-641.86-641.86-641.86S1044,1335,1044,1689.52m1159.13-667.31a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M1180.85,2707c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27S2059.13,666,2191,672c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M1170.5,447.09c-133.07,6.06-224,27.16-303.41,58.06-82.19,31.91-151.86,74.72-221.43,144.18S533.39,788.47,501.48,870.76c-30.9,79.46-52,170.34-58.06,303.41-6.16,133.28-7.57,175.89-7.57,515.35s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43s139.14,112.18,221.43,144.18c79.56,30.9,170.34,52,303.41,58.06,133.35,6.06,175.89,7.57,515.35,7.57s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2586.8,537.06,2504.71,505.15c-79.56-30.9-170.44-52.1-303.41-58.06C2068,441,2025.41,439.52,1686,439.52s-382.1,1.41-515.45,7.57"
                            fill="#fff" />
                        </svg>
                      </span>
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/company/pvpofficeng"
                      style="margin-right:20px;text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="114" height="30"
                          viewBox="1.786 1.783 287.865 76.248">
                          <path
                            d="M213.882 7.245c0-3.015 2.508-5.462 5.6-5.462h64.568c3.093 0 5.6 2.447 5.6 5.462V72.57c0 3.016-2.507 5.461-5.6 5.461h-64.568c-3.092 0-5.6-2.445-5.6-5.46V7.244z"
                            fill="#069" />
                          <path
                            d="M1.785 65.652h31.62V55.27H13.23V15.665H1.785v49.987zM49.414 65.652v-34.43H37.97v34.43h11.444zm-5.721-39.13c3.99 0 6.474-2.644 6.474-5.95-.074-3.378-2.484-5.947-6.398-5.947-3.915 0-6.475 2.57-6.475 5.947 0 3.306 2.484 5.95 6.324 5.95h.075zM54.727 65.652h11.444V46.424c0-1.029.074-2.058.377-2.791.826-2.056 2.709-4.186 5.871-4.186 4.142 0 5.799 3.158 5.799 7.784v18.42H89.66V45.91c0-10.576-5.646-15.497-13.176-15.497-6.173 0-8.884 3.451-10.39 5.802h.077v-4.993H54.727c.151 3.231 0 34.43 0 34.43zM105.805 15.665H94.361v49.987h11.444V54.489l2.86-3.601 8.96 14.764h14.078l-15.056-21.373 13.174-14.54h-13.776s-9.411 13.008-10.24 14.552V15.665z" />
                          <path
                            d="M162.306 51.29c.151-.884.377-2.58.377-4.498 0-8.9-4.518-17.936-16.413-17.936-12.724 0-18.597 10.063-18.597 19.19 0 11.288 7.153 18.337 19.65 18.337 4.97 0 9.561-.732 13.327-2.275l-1.506-7.558c-3.088 1.024-6.25 1.537-10.164 1.537-5.345 0-10.012-2.195-10.389-6.871l23.715.072v.002zm-23.79-7.742c.301-2.938 2.26-7.273 7.153-7.273 5.194 0 6.4 4.628 6.4 7.273h-13.552zM190.93 15.665v17.304h-.151c-1.657-2.422-5.12-4.038-9.71-4.038-8.81 0-16.564 7.05-16.49 19.094 0 11.164 7.003 18.435 15.735 18.435 4.744 0 9.26-2.058 11.52-6.024h.225l.453 5.216h10.163c-.15-2.424-.302-6.61-.302-10.723V15.664h-11.444zm0 34.05c0 .88-.075 1.763-.227 2.495-.675 3.16-3.386 5.361-6.699 5.361-4.742 0-7.83-3.818-7.83-9.84 0-5.654 2.637-10.208 7.906-10.208 3.538 0 6.022 2.423 6.7 5.433.15.663.15 1.398.15 2.058v4.7z" />
                          <path
                            d="M236.85 65.61V31.18h-11.444v34.43h11.445zm-5.72-39.13c3.99 0 6.474-2.644 6.474-5.948-.075-3.379-2.484-5.949-6.398-5.949-3.917 0-6.475 2.57-6.475 5.949 0 3.304 2.483 5.948 6.324 5.948h.074zM243.184 65.61h11.443V46.385c0-1.028.075-2.058.377-2.792.827-2.057 2.71-4.186 5.872-4.186 4.14 0 5.797 3.157 5.797 7.786V65.61h11.443V45.869c0-10.575-5.645-15.496-13.174-15.496-6.173 0-8.884 3.45-10.39 5.8h.076v-4.992h-11.443c.149 3.23-.001 34.43-.001 34.43z"
                            fill="#fff" /></svg>
                      </span>
                    </a>
                    <a target="_blank" href="https://vimeo.com/user147596419"
                      style="margin-right:20px;text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg width="30" height="34" viewBox="0 -32 512.0001 512" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="m507.214844 126.574219c-4.992188 22.652343-13.480469 44.96875-25.210938 66.324219-32.53125 59.199218-108.800781 184.054687-197.363281 234.21875-18.980469 10.761718-38.539063 18.089843-58.351563 20.597656l-.9375.117187h-1.128906c-4.492187 0-20.65625-1.796875-39.835937-24.941406-22.257813-26.855469-41.445313-73.144531-57.042969-137.585937l-.027344-.136719c-.203125-.839844-19.761718-84.378907-49.304687-143.738281l-.210938-.449219c-.050781-.109375-5.480469-11.660157-18.21875-11.660157-7.308593 0-15.617187 3.652344-24.703125 10.863282-9.195312 7.308594-22.296875 5.988281-29.824218-2.988282-7.207032-8.605468-6.648438-21.066406 1.308593-28.984374 22.585938-22.484376 69.582031-69.261719 106.015625-87.722657 2.816406-1.429687 5.808594-2.675781 9.144532-3.804687h.011718c18.871094-6.378906 39.027344-4.890625 56.761719 4.175781 17.632813 9.015625 30.542969 24.371094 36.371094 43.242187 3.386719 10.960938 6.070312 23.53125 8 37.378907l.027343.210937c2.964844 23.84375 9.464844 69.863282 19.710938 110.167969 15.886719 62.464844 30.300781 70.992187 33.027344 72.058594l.25.109375c.03125.011718.789062.320312 2.207031.320312 2.046875 0 4.292969-.378906 6.75-1.289062 15.335937-5.648438 38.769531-31.777344 71.078125-113.703125l.0625-.136719c.089844-.210938.078125-.210938.429688-1.089844l.707031-1.855468c1.757812-4.523438 2.734375-9.085938 2.914062-13.5625.261719-6.609376-.617187-16.035157-6.289062-23.382813-6.597657-8.535156-17.664063-12.28125-33.816407-11.390625-7.617187.417969-14.71875-3.136719-18.972656-9.496094s-4.820312-14.269531-1.527344-21.167968c10.175782-21.285157 27.707032-42.152344 48.105469-57.25 26.53125-19.640626 58.070313-30.023438 91.207031-30.023438h.113282c1.507812.0195312 37.082031.648438 59.148437 33.546875 14.945313 22.296875 18.109375 53.597656 9.414063 93.027344zm0 0"
                            fill="#6aa9ff" />
                          <path
                            d="m507.214844 126.574219c-4.992188 22.652343-13.480469 44.96875-25.210938 66.324219-32.53125 59.199218-108.800781 184.054687-197.363281 234.21875v-144.058594c15.335937-5.648438 38.769531-31.777344 71.078125-113.703125l.0625-.136719c.089844-.210938.078125-.210938.429688-1.089844l.707031-1.855468c1.757812-4.523438 2.734375-9.085938 2.914062-13.5625.261719-6.609376-.617187-16.035157-6.289062-23.382813-6.597657-8.535156-17.664063-12.28125-33.816407-11.390625-7.617187.417969-14.71875-3.136719-18.972656-9.496094s-4.820312-14.269531-1.527344-21.167968c10.175782-21.285157 27.707032-42.152344 48.105469-57.25 26.53125-19.640626 58.070313-30.023438 91.207031-30.023438h.113282c1.507812.0195312 37.082031.648438 59.148437 33.546875 14.945313 22.296875 18.109375 53.597656 9.414063 93.027344zm0 0"
                            fill="#2682ff" /></svg>
                      </span>
                    </a>
                    <a target="_blank" href="https://www.youtube.com/channel/UCpQEFQ9f2EeoOtdBMrL3JrQ"
                      style="text-decoration: auto;">
                      <span class="svg-icon svg-icon-3 svg-icon-success">
                        <svg height="34" viewBox="0 .03 2498 2502.47" width="30" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="m0 1864.11v.11c1.5 55.5 2 111.32 11.32 166.47 9.92 58.35 24.1 115.25 51.15 168.21q54.86 107.52 150.21 181.66c45.52 35.5 95.25 63.69 150.3 81.47 80.26 25.89 163.07 35.81 247.09 36.3 52.42.33 104.81 1.64 157.25 1.42 380.82-1.6 761.65 2.75 1142.49-2.35 50.53-.68 100.24-6.85 149.84-15.92 95.06-17.4 179.07-58 250.95-122.09 83.77-74.71 140.29-166.16 165.81-276.52 16.69-72.14 20.87-145.32 21.58-218.77v-14.65c0-5.68-2.16-1247.91-2.36-1264.33-.55-45.1-3.88-89.87-12.33-134.25-10.29-54.08-24.82-106.78-50.71-155.7-27.35-51.7-61.6-98.17-104-138.79-64.89-62.23-139.78-106.23-227-129.51-78.74-21-159.07-25.68-240-25.6a2.45 2.45 0 0 1 -.45-1.24h-1224.74c0 .42 0 .83-.07 1.24-45.93.84-91.92.49-137.61 6.16-50.05 6.22-99.63 15.59-147 33.09-74.62 27.6-139.46 70.59-194.84 128-62.75 65-107 140.22-130.44 227.79-20.95 78.13-25.51 157.81-25.62 238.06"
                            fill="#fff" />
                          <path d="m0 .79h2498v2498h-2498z" fill="none" />
                          <path
                            d="m1293.24 1938.65-409.54-7.49c-132.6-2.61-265.53 2.6-395.53-24.44-197.76-40.4-211.77-238.49-226.43-404.65-20.2-233.6-12.38-471.44 25.74-703.09 21.52-129.98 106.21-207.54 237.18-215.98 442.12-30.63 887.18-27 1328.32-12.71 46.59 1.31 93.5 8.47 139.44 16.62 226.77 39.75 232.3 264.23 247 453.2 14.66 190.92 8.47 382.82-19.55 572.44-22.48 157-65.49 288.66-247 301.37-227.42 16.62-449.62 30-677.68 25.74.01-1.01-1.3-1.01-1.95-1.01zm-240.77-397.48c171.38-98.4 339.49-195.16 509.89-292.9-171.7-98.4-339.49-195.16-509.89-292.9z"
                            fill="#f00" /></svg>
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="center"
                    style="font-size: 13px; padding:0 15px; text-align:center; font-weight: 500; color: #A1A5B7;font-family:Arial,Helvetica,sans-serif">
                    <p>&copy; Copyright. All Rights Reserved.
                      <a href="https://keenthemes.com" rel="noopener" target="_blank"
                        style="font-weight: 600;font-family:Arial,Helvetica,sans-serif">PVP Office, Nigeria</a>&nbsp;
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>
`;

    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      'subject': req.body.title,
      'sender': {
        'email': 'pvpofficeng@gmail.com',
        'name': 'Plant Variety Protection Office'
      },
      'replyTo': {
        'email': 'pvpofficeng@gmail.com',
        'name': 'Plant Variety Protection Office'
      },
      'to': [{
        'name': `${req.body.fullname}`,
        'email': `${req.body.email}`
      }],
      'htmlContent': `${contents}`
    }).then((data) => {
      // return next({
      //   success: data
      // });
    }, (error) => {
      // return next({
      //   err: error
      // });
    });

  }

}

module.exports = EmailHelper;