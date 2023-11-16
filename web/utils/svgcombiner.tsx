import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

export function replaceTag(svg: string, newGroup: string, tag: string) {
  const parsed = extractSVG(svg);
  const parsedNew = extractSVG(newGroup);

  const doc = new DOMParser().parseFromString(parsed, "text/xml");

  const newDoc = new DOMParser().parseFromString(parsedNew, "text/xml");

  let hasit = parsed.includes(tag);

  const gTag = doc.getElementById(tag);

  // console.log("current: " + gTag);
  // console.log("new: " + newDoc);

  //   gTag!.parentNode!.replaceChild(newDoc, gTag!);

  gTag!.textContent = "";
  gTag?.appendChild(newDoc);

  return new XMLSerializer().serializeToString(doc);
}

export function extractSVG(image: string) {
  // console.log("extracting: " + image);
  return window.atob(String(image).split("base64,").pop()!);
  //replace("data:application/json;base64,", "")
  //   );

  //   data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2xpcFBhdGggaWQ9ImJveCI+PHBhdGggZD0iTTAgMGg1MTJ2NTEySDB6Ii8+PC9jbGlwUGF0aD48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNreUdyYWRpZW50IiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDE2KSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iaHNsKDcwLDEwMCUsMzAlKSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iaHNsKDEwLDEwMCUsMzAlKSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjbG91ZEdyYWRpZW50IiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDE2KSI+PHN0b3Agc3RvcC1vcGFjaXR5PSIuMSIgb2Zmc2V0PSIxNSUiLz48c3RvcCBzdG9wLW9wYWNpdHk9Ii41IiBvZmZzZXQ9IjMwJSIvPjxzdG9wIHN0b3Atb3BhY2l0eT0iLjEiIG9mZnNldD0iNTAlIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImRheUdyYWRpZW50IiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDEzKSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iaHNsKDI1MCwxMDAlLDkwJSkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9ImhzbCgxOTAsMTAwJSwzMCUpIi8+PC9saW5lYXJHcmFkaWVudD48ZmlsdGVyIGlkPSJzdGFycyI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIuMzUiIHNlZWQ9IjQ5NyIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgOSAtNCAwIDAgMCA5IC00IDAgMCAwIDkgLTQgMCAwIDAgMCAxIi8+PC9maWx0ZXI+PGZpbHRlciBpZD0iY2xvdWRzIiB4PSItNTAlIiB5PSItNTAlIiBoZWlnaHQ9IjIwMCUiIHdpZHRoPSIyMDAlIj48ZmVHYXVzc2lhbkJsdXIgaW49InNreSIgc3RkRGV2aWF0aW9uPSIyMCIgcmVzdWx0PSJza3libHVyIi8+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9Ii4wMSIgbnVtT2N0YXZlcz0iNSIgcmVzdWx0PSJza3lub2lzZSIgc2VlZD0iNDk3Ii8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMCAzIC0xIC0xIDAgMCIvPjxmZUNvbXBvc2l0ZSBvcGVyYXRvcj0iaW4iIGluMj0iU291cmNlR3JhcGhpYyIvPjwvZmlsdGVyPjxmaWx0ZXIgaWQ9ImxpZ2h0Ij48ZmVTcGVjdWxhckxpZ2h0aW5nIHJlc3VsdD0ic3BlY091dCIgc3BlY3VsYXJFeHBvbmVudD0iMTAwIiBsaWdodGluZy1jb2xvcj0id2hpdGUiPjxmZVBvaW50TGlnaHQgeD0iMTAiIHk9IjcwIiB6PSIzMDAiLz48L2ZlU3BlY3VsYXJMaWdodGluZz48ZmVDb21wb3NpdGUgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0ic3BlY091dCIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsxPSIwIiBrMj0iMSIgazM9IjEiIGs0PSIwIi8+PC9maWx0ZXI+PC9kZWZzPjxzdmcgdmlld0JveD0iMCAwIDUxMiA1MTIiIGNsaXAtcGF0aD0idXJsKCNib3gpIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjc3RhcnMpIiBvcGFjaXR5PSIxIi8+PHBhdGggZmlsbD0idXJsKCNkYXlHcmFkaWVudCkiIGQ9Ik0wIDBoNTEydjUxMkgweiIgb3BhY2l0eT0iMCIgIGZpbHRlcj0idXJsKCNsaWdodCkiLz48cGF0aCBmaWxsPSJ1cmwoI3NreUdyYWRpZW50KSIgIGQ9Ik0wIDBoNTEydjUxMkgweiIgb3BhY2l0eT0iLjciLz48cGF0aCBmaWxsPSJ1cmwoI2Nsb3VkR3JhZGllbnQpIiBmaWx0ZXI9InVybCgjY2xvdWRzKSIgZD0iTTAgMGg1NjV2NTEySDB6Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM0LC0yOTApLCByb3RhdGUoMCkiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuOCI+PC9nPjxnIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjciPjwvZz48ZyBpZD0ic2t5bWF0aCI+PC9nPjxnIGlkPSJkZWNvIj48L2c+PGcgaWQ9InNpbGhvdWV0dGUiPjwvZz48L3N2Zz48L3N2Zz4=
}

export function extractFirstColor(svg: string) {
  // const parsed = extractSVG(svg);
  const doc = new DOMParser().parseFromString(svg, "text/xml");
  const gradient = doc.getElementById("skyGradient");
  // // gradient?.childNodes[0].
  const first = new XMLSerializer().serializeToString(gradient!.childNodes[0]);

  const value = first.substring(first.indexOf("hsl(") + 4, first.indexOf(","));
  // console.log("pulled: ", value);
  return value;
}

export function extractSecondColor(svg: string) {
  // const parsed = extractSVG(svg);
  const doc = new DOMParser().parseFromString(svg, "text/xml");
  const gradient = doc.getElementById("skyGradient");
  // // gradient?.childNodes[0].
  const first = new XMLSerializer().serializeToString(gradient!.childNodes[1]);

  const value = first.substring(first.indexOf("hsl(") + 4, first.indexOf(","));
  // console.log("pulled: ", value);
  return value;
}

export function extractClouds(svg: string) {
  const parsed = extractSVG(svg);
  const doc = new DOMParser().parseFromString(parsed, "text/xml");

  const gradient = doc.getElementById("cloudGradient");
  // // gradient?.childNodes[0].
  const first = new XMLSerializer().serializeToString(gradient!.childNodes[0]);

  const value = first.substring(
    first.indexOf('stop-opacity=".') + 15,
    first.indexOf('"') + 3
  );
  console.log("pulled cloud: ", value);
  return value;
}

export function replaceGradients(
  svg: string,
  newPrimary: number,
  newSecondary: number
) {
  const parsed = extractSVG(svg);
  const doc = new DOMParser().parseFromString(parsed, "text/xml");

  const night = doc.getElementById("skyGradient");
  const day = doc.getElementById("dayGradient");

  if (newPrimary) {
    const primaryNight =
      'stop offset="0%" stop-color="hsl(' + newPrimary + ',100%,30%)"';
    night?.replaceChild(doc.createElement(primaryNight), night.childNodes[0]);

    const primaryDay =
      'stop offset="0%" stop-color="hsl(' +
      rotateColor(newPrimary, 240) +
      ',100%,90%)"';

    day?.replaceChild(doc.createElement(primaryDay), day!.childNodes[0]);
  }

  if (newSecondary) {
    const secondaryNight =
      'stop offset="100%" stop-color="hsl(' + newSecondary + ',100%,30%)"';
    night?.replaceChild(doc.createElement(secondaryNight), night.childNodes[1]);

    const secondaryDay =
      'stop offset="100%" stop-color="hsl(' +
      rotateColor(newSecondary, 180) +
      ',100%,30%)"';

    day?.replaceChild(doc.createElement(secondaryDay), day!.childNodes[1]);
  }

  return new XMLSerializer().serializeToString(doc);
}

export function rotateColor(hue: number, rotate: number) {
  return (hue + rotate) % 360;
}

export function replaceClouds(svg: string, density: number) {
  const parsed = extractSVG(svg);
  const doc = new DOMParser().parseFromString(parsed, "text/xml");

  const clouds = doc.getElementById("cloudGradient");
  // console.log("clouds svg children: " + clouds);

  const newClouds = 'stop stop-opacity=".' + density + '" offset="15%"';
  const newClouds2 = 'stop stop-opacity=".' + density + '" offset="50%"';

  clouds?.replaceChild(doc.createElement(newClouds), clouds.childNodes[0]);
  clouds?.replaceChild(doc.createElement(newClouds2), clouds.childNodes[2]);

  // console.log("clouds svg children: " + clouds);

  return new XMLSerializer().serializeToString(doc);
}

// Replace the <g> tag with a new <rect> tag
// const newRectTag = svgDoc.createElementNS("http://www.w3.org/2000/svg", "rect");
// newRectTag.setAttribute("width", "100");
// newRectTag.setAttribute("height", "100");
// newRectTag.setAttribute("fill", "red");

// gTag.parentNode.replaceChild(newRectTag, gTag);

// // Write the SVG document to a file
// svgDoc.write("my-svg.svg");
