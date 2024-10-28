import {
  createWriteStream,
  access,
  unlink,
  constants
} from "node:fs";
import path from "node:path";

export async function remove_image(img: string) {
  const complete_path = path.join(process.cwd(), "app", "api", "assets", img);
  
  access(complete_path, constants.R_OK, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      return;
    }

    unlink(complete_path, (er: NodeJS.ErrnoException | null) => {
      if (er) {
        throw new Error(er.message);
      }
    });
  });
}

export async function store_image(file: File) {

    const filename = decodeURIComponent(file.name);

    const writeStream = createWriteStream(path.join(process.cwd(), "app", "api", "assets", filename));
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
