# Issue 1

Without the patch to change the package entrypoint, you get server code leaking to the client. `start.ts` needs to be isomorphic as it runs on both client and server so importing from main entrypoint which includes server only stuff is not supported.

# Issue 2

Go to `/api-request`. Check server logs, sometimes you're authed and sometimes not?? Refreshing from client always makes an authenticated request

https://github.com/user-attachments/assets/6053ea73-1708-4b68-9e0f-bacccc2f4203

