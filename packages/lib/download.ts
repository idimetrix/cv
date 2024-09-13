export function downloadSVG(content: string, file: string) {
  // Create a blob from the SVG content
  const blob = new Blob([content], { type: "image/svg+xml" });

  // Create a link element
  const link = document.createElement("a");

  // Create an object URL for the blob and set it as the href attribute
  link.href = URL.createObjectURL(blob);

  // Set the download attribute to specify the file name
  link.download = `${file}.svg`;

  // Append the link to the body
  document.body.appendChild(link);

  // Programmatically trigger a click on the link to trigger the download
  link.click();

  // Remove the link from the DOM
  document.body.removeChild(link);
}
