console.log("Sanity Project ID:", process.env.SANITY_STUDIO_PROJECT_ID);
console.log("Sanity Dataset:", process.env.SANITY_STUDIO_DATASET);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-02';

// Sanity-specific variables for the Studio (SANITY_STUDIO prefix)
export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: SANITY_STUDIO_DATASET'
);

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID'
);

// Assert function to check for undefined values
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}