import { createClient, Entry } from 'contentful';

// Define the type for a Document (rich text content)
interface Document {
  // data: {};
  content: Array<{
    // data: {};
    content: Array<{
      // data: {};
      marks: string[];
      value: string;
      nodeType: string;
    }>;
    nodeType: string;
  }>;
  nodeType: string;
}

// Define the type for a Post
interface Post {
  sys: {
    id: string;
  };
  fields: {
    body: Document;
    title: string;
    headline: Document; // Use the Document type defined above
    runway?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    publishDate?: string; // Add the publishDate field if it exists in your Contentful schema
  };
}

// Initialize the Contentful client with the provided space ID and access token
export const contentfulClient = createClient({
  space: 'niel5amhjp9m', // Your space ID
  accessToken: 'HYxSUjabtgCtMtHmau-L8GoP5w_kjD2kOccVGYCmVuU', // Your access token
});

// Function to fetch entries of a specific content type
// export async function fetchEntriesOld(contentType: string) {
//   try {
//     console.log(`Fetching entries for content type: ${contentType}`); // Log the content type being fetched
//     const params = { content_type: contentType }; // Prepare parameters
//     console.log(`Parameters sent to Contentful:`, JSON.stringify(params)); // Log the parameters as a string
//     const entries = await contentfulClient.getEntries(params);
//     console.log(`Request for content type: ${contentType}`); // Log the request
//     console.log(`Response:`, entries); // Log the response
//     if (entries.items) return entries.items.map((entry: Entry<any>) => ({
//       sys: entry.sys,
//       fields: {
//         title: entry.fields.title,
//         headline: isDocument(entry.fields.headline) ? entry.fields.headline : ({} as Document), // Ensure the headline is typed as Document
//         runway: entry.fields.runway,
//         publishDate: entry.fields.publishDate // Map the publishDate field if it exists
//       }
//     })) as Post[];
//     throw new Error(`Failed to fetch entries for content type: ${contentType}`); // Throw an error if entries are not found
//   } catch (error: any) { // Assert the error type as 'any'
//     console.error(`Error fetching entries for content type '${contentType}':`, error.response ? error.response : error); // Log detailed error response
//     console.error(`Full error details:`, error); // Log full error details
//     throw error; // Rethrow the error for further handling
//   }
// }

export async function fetchEntries(content_type: string) {
  try {
    const entries = await contentfulClient.getEntries({
      content_type
    });
    return entries.items.map((entry: Entry) => ({
      sys: entry.sys,
      fields: {
        title: entry.fields.title,
        headline: entry.fields.headline ? entry.fields.headline : null, // Ensure the headline is typed as Document
        runway: entry.fields.runway,
        publishDate: entry.fields.publishDate // Map the publishDate field if it exists
      }
    })) as unknown as Post[];

  } catch (error) {
    console.log(error);
  }
}

export async function fetchEntry(id: string) {
  try {
    const entry = await contentfulClient.getEntry(id);
    console.log('Fetched entry:', entry); // Add this line to log the fetched entry
    return entry as unknown as Post
  } catch (error) {
    console.log(error);
  }
}

// Helper function to check if a value is of type Document
// function isDocument(value: { object?: any, data?: any, content?: any, nodeType: any }): value is Document {
//   return (
//     value &&
//     typeof value === 'object' &&
//     'data' in value &&
//     'content' in value &&
//     'nodeType' in value
//   );
// }

// New function to fetch categories
export async function fetchCategories() {
  return fetchEntries('Blog'); // Remove the 'await' keyword here
}
