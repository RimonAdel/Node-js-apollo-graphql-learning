import { createWriteStream } from "fs";
import { type } from "os";
import { parse, join } from "path";
import { URL } from "../../config";

export default {
  Query: {
    info: () => "hello i am Image Resolver ",
  },

  Mutation: {
    imageUploader: async (_, { file }) => {
      let { filename, createReadStream } = await file;
      let stream = createReadStream();
      let { ext, name } = parse(filename);
      name = name.replace(/([^a-z09 ]+)/gi, "-").replace(" ", "-");
      let serverFile = join(
        __dirname,
        `../../uploads/${name}-${new Date().getTime()}${ext}`
      );
      let writeStream = await createWriteStream(serverFile);
      await stream.pipe(writeStream);
      serverFile = `${URL}${serverFile.split("uploads")[1]}`;
      return serverFile;
    },
  },
};
