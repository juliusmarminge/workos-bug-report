import { createStart } from "@tanstack/react-start";
import { authkitMiddleware } from "@workos/authkit-tanstack-react-start/middleware";

const authMiddleware = authkitMiddleware();

/**
 * Configure TanStack Start with AuthKit middleware.
 * The middleware runs on every server request and provides auth context.
 */
export const startInstance = createStart(() => {
  return {
    // Run AuthKit middleware on every request
    requestMiddleware: [authMiddleware],
  };
});
