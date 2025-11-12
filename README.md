# Issue 1

Without [this patch here](https://github.com/juliusmarminge/workos-bug-report/blob/main/patches/%40workos__authkit-tanstack-react-start.patch) to change the package entrypoint, you get server code leaking to the client. `start.ts` needs to be isomorphic as it runs on both client and server so importing from main entrypoint which includes server only stuff is not supported.

<img width="2940" height="1912" alt="CleanShot 2025-11-12 at 08 59 00@2x" src="https://github.com/user-attachments/assets/db060ea6-0c3d-4982-88e6-c1fccdc78dc5" />

# Issue 2

Go to `/api-request`. Check server logs, sometimes you're authed and sometimes not?? Refreshing from client always makes an authenticated request

https://github.com/user-attachments/assets/6053ea73-1708-4b68-9e0f-bacccc2f4203

