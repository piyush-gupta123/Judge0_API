import Docker from "dockerode";

const docker = new Docker();

const compile = async (req, res) => {
  const { code, language } = req.body;
  const container = await docker.createContainer({
    Image: `compiler-${language}`, // Replace with the appropriate Docker image for the specific language
    Cmd: ["sh", "-c", `echo "${code}" > code.file && run-compiler code.file`], // Replace with the appropriate command to compile the code
  });

  await container.start();

  // Wait for the container to finish
  const output = await container.wait();

  // Get the container logs
  const logs = await container.logs({ stdout: true });

  // Remove the container
  await container.remove();

  res.json({
    output:
      output.StatusCode === 0 ? "Compilation Successful" : "Compilation Failed",
    logs: logs.toString(),
  });
};

export default compile;
