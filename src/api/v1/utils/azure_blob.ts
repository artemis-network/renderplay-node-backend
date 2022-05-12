import { BlobServiceClient } from "@azure/storage-blob";

const account = "<account>";

const blobServiceClient = new BlobServiceClient(
	`https://${account}.blob.core.windows.net`,
);

const containerName = "renderscan";

const uploadFile = async () => {
	const containerClient = blobServiceClient.getContainerClient(containerName);
	const content = "Hello world!";
	const blobName = "newblob" + new Date().getTime();
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
	const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
	console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}