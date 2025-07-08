import { Innertube } from "youtubei.js";

let innertube: any = null;

async function getInnertube() {
  if (innertube) return innertube;
  innertube = await Innertube.create();
  return innertube;
}

export { getInnertube };
