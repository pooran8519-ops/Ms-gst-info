export default function handler(req, res) {

  const { gst } = req.query;

  const stateCodes = {
    "01": "Jammu & Kashmir",
    "07": "Delhi",
    "09": "Uttar Pradesh",
    "23": "Madhya Pradesh",
    "27": "Maharashtra",
    "29": "Karnataka",
    "33": "Tamil Nadu"
  };

  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/;

  if (!gst) {
    return res.status(400).json({
      success: false,
      message: "GST number is required"
    });
  }

  const isValidFormat = gstRegex.test(gst);

  let responseData;

  if (!isValidFormat) {

    responseData = {
      status: "failed",
      message: "Invalid GST format",
      data: []
    };

  } else {

    const stateCode = gst.substring(0, 2);
    const pan = gst.substring(2, 12);
    const entityNumber = gst.substring(12, 13);
    const checkCode = gst.substring(14);

    responseData = {
      status: "success",
      message: "GST format verified successfully",
      data: {
        GSTIN: gst,
        State_Code: stateCode,
        State_Name: stateCodes[stateCode] || "Unknown",
        PAN_Number: pan,
        Entity_Number: entityNumber,
        Default_Character: "Z",
        Check_Code: checkCode,
        Registration_Type: "Regular (Format Based)",
        Country: "India",
        Developer: "@MS_HAC4KER"
      }
    };
  }

  return res.status(200).json({
    success: true,
    source: "/gst",
    input: gst,
    timestamp: new Date().toISOString(),
    data: responseData
  });

    }
