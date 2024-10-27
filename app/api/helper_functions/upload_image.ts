
import { createWriteStream } from "node:fs";
import path from "node:path";

async function store_image(file: File) {

    const filename = file.name.replaceAll(" ", "_");

    const writeStream = createWriteStream(path.join(process.cwd(), "public/assets", filename));
    const readableStream = file.stream();

    const reader = readableStream.getReader();

    const readAndWrite = async () => {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        writeStream.write(value);
      }
    };

    await readAndWrite();
    writeStream.end();
}

export default store_image;
