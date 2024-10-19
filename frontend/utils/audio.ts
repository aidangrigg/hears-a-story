
/**
 * Takes in a Blob and returns a Promise to a Data URI
 * Format: data:[content]/[type];base64,[base64 encoded data]
 * More info can be found here: [https://en.wikipedia.org/wiki/Data_URI_scheme]
 */
export function blobToBase64URI(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if(typeof reader.result === "string") {
	resolve(reader.result);
      } else {
	reject("reader.result was not of type string");
      }
    };
    reader.readAsDataURL(blob);
  });
}
