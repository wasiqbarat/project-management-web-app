# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```
project-mgmt-front
├─ .env
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ AccessMenu.css
│  │  ├─ AccessMenu.jsx
│  │  ├─ Dashboard.css
│  │  ├─ Dashboard.jsx
│  │  ├─ Login.css
│  │  ├─ Login.jsx
│  │  ├─ PrivateRoute.jsx
│  │  ├─ ProjectDetail.css
│  │  ├─ ProjectDetail.jsx
│  │  ├─ Signup.jsx
│  │  ├─ UserProfile.css
│  │  ├─ UserProfile.jsx
│  │  ├─ Workbench.css
│  │  └─ Workbench.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ services
│     ├─ api.js
│     ├─ authService.js
│     └─ workbenchService.js
└─ vite.config.js

```
```
project-mgmt-front
├─ .env
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 00
│  │  │  └─ 2a56d04a2cd1670dd028ec4f0adeb103e83194
│  │  ├─ 02
│  │  │  └─ e74fbc6e7258b2747cab0d87488a2cbce9186b
│  │  ├─ 04
│  │  │  └─ 23c41d7e34856a48b5865beb91298867979064
│  │  ├─ 09
│  │  │  └─ 76dcb3fefc3d28fada26f4a6bf5fa18ab9a7d9
│  │  ├─ 0c
│  │  │  └─ 589eccd4d48e270e161a1ab91baee5e5f4b4bc
│  │  ├─ 0d
│  │  │  └─ a5f87f37b931a9a03cdaddff6bc8bd458d5a2a
│  │  ├─ 15
│  │  │  └─ 96f756017f4ca6aeaaf6fccdd0f2fe875963ea
│  │  ├─ 1d
│  │  │  └─ 90dfc2c9f1d42d45b9a04d37aad67ae172c3ae
│  │  ├─ 20
│  │  │  └─ 8e767b4e4be271f0b07152796231615aa8edd6
│  │  ├─ 23
│  │  │  └─ 8d2e4e6436b353404369d9a59fda5f1f980657
│  │  ├─ 2f
│  │  │  └─ ccffb7b938d395e686325f0d2a9fdc800c7f66
│  │  ├─ 33
│  │  │  ├─ 07f2b95f72c4fbcd18a87d6b37e3683faa497b
│  │  │  └─ ca7bfd6a9a7d8500ff3b2fc2326cfedbbeec51
│  │  ├─ 3a
│  │  │  └─ 0365fff129ddc5146fcc873742d1f0984da942
│  │  ├─ 3f
│  │  │  └─ cc8d3db30a5b4d0d8eb4a2a37e775a9140fc7e
│  │  ├─ 45
│  │  │  ├─ 596b0a1a68451c4dd4195fdb3da3932afb9ac9
│  │  │  └─ e0b20352acdee30abe8716406971dd01a0e363
│  │  ├─ 4a
│  │  │  └─ 5b1488362bd97211d94566bb07a90d8b36b366
│  │  ├─ 55
│  │  │  ├─ 58b06679360c23b7b54638ae305bc0b01136e6
│  │  │  ├─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  │  └─ b50bb4c999d1033ed9c2c4f32452f327355062
│  │  ├─ 60
│  │  │  └─ 125d0cda4c3318c12e71094daf0cea8a319366
│  │  ├─ 62
│  │  │  └─ e09edc9cbfc5a68b21ad4495f903a4de42f6c2
│  │  ├─ 6c
│  │  │  └─ 87de9bb3358469122cc991d5cf578927246184
│  │  ├─ 7f
│  │  │  └─ bf5a41933f20f8ddaeff23cbee005bcf316f48
│  │  ├─ 87
│  │  │  └─ f761c7b9dae290837d179e1fc34a6260f1100f
│  │  ├─ 8a
│  │  │  └─ 98b678f9a784f5ff853edd70b015e9d5201589
│  │  ├─ 8b
│  │  │  └─ 0f57b91aeb45c54467e29f983a0893dc83c4d9
│  │  ├─ 94
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ 98
│  │  │  └─ 2d298f3e1c9984b9c6c67e174d87662e247882
│  │  ├─ 9a
│  │  │  └─ eab58292ec552b79df1bdc40acd57b1e562fb4
│  │  ├─ 9e
│  │  │  └─ 1787dca9c4ebbf895efe1ac1e8b70aab4ae1bc
│  │  ├─ a5
│  │  │  └─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  ├─ a7
│  │  │  └─ 6309e804c51259b7073b2859e7627f0cc9855e
│  │  ├─ ae
│  │  │  └─ b0af9dd089d742cc013045fd5f691054be0a03
│  │  ├─ b0
│  │  │  └─ 164a81ed0497d62421c53392c7d285b504b870
│  │  ├─ b5
│  │  │  └─ 0e728c2ec8e73ec2fafabf3b83c3f517d9586b
│  │  ├─ c6
│  │  │  └─ 39f66e9f3b0ac34030d5d5053b38e37666e9ef
│  │  ├─ ca
│  │  │  └─ 26f76fae3157bf304f7ec54a6ee05b04238072
│  │  ├─ d9
│  │  │  └─ f5f9c34fe3effb03f4cd8b0eeaf18618d426e5
│  │  ├─ da
│  │  │  └─ 7c9efa50b5937b7b32210dee68fdf2038398fc
│  │  ├─ db
│  │  │  ├─ d1df99a05341fe0a5e106c0b577822a93f5cb1
│  │  │  └─ d5ee58e162e5216f7b8376b26e55e688c88e56
│  │  ├─ e7
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ e8
│  │  │  ├─ 02b641054a0c8d03f3d803ffb0c446905373f3
│  │  │  └─ 5bb69e53d543267a7f7c21b6dd8e3b0bb5bf38
│  │  ├─ ec
│  │  │  └─ 24f591b5b559b8665a0adf2c1cb71240ac7ee1
│  │  ├─ ed
│  │  │  └─ c65763808a2e7adba17696995d29f34edf1312
│  │  ├─ f0
│  │  │  └─ e79d17a30713c0301bb40545d1895245954755
│  │  ├─ f1
│  │  │  └─ fdc9b2e22785722476f2b042e6f46bbb87b36f
│  │  ├─ f4
│  │  │  └─ 0df1384e763ffee1610e35a9fa0b526ef0362e
│  │  ├─ f6
│  │  │  └─ 344693a8f8d206c57f0f4a1c35ea0187022e0a
│  │  ├─ f8
│  │  │  └─ fbe6a7e510dfbfee0f61a5b112c359d9dd0e5a
│  │  ├─ fa
│  │  │  └─ e7d32115752d1209e772efc64fa4c092953a4b
│  │  ├─ fb
│  │  │  ├─ ce21554c03f1d7c00e9c3e327bbaafdb02ed0d
│  │  │  └─ d26e10d71f7c6d54098668691a29ce197cb4ea
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ public.zip
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ AccessMenu.css
│  │  ├─ AccessMenu.jsx
│  │  ├─ Dashboard.css
│  │  ├─ Dashboard.jsx
│  │  ├─ Login.css
│  │  ├─ Login.jsx
│  │  ├─ MyProjects.css
│  │  ├─ MyProjects.jsx
│  │  ├─ PrivateRoute.jsx
│  │  ├─ ProfileEdit.css
│  │  ├─ ProfileEdit.jsx
│  │  ├─ ProjectDetail.css
│  │  ├─ ProjectDetail.jsx
│  │  ├─ Projects.css
│  │  ├─ Projects.jsx
│  │  ├─ SignUp.css
│  │  ├─ Signup.jsx
│  │  ├─ UserProfile.css
│  │  ├─ UserProfile.jsx
│  │  ├─ workbench
│  │  │  ├─ MyColleagues.css
│  │  │  ├─ MyColleagues.jsx
│  │  │  ├─ OverdueTasks.css
│  │  │  ├─ OverdueTasks.jsx
│  │  │  ├─ ProjectStatuses.css
│  │  │  ├─ ProjectStatuses.jsx
│  │  │  ├─ TaskList.css
│  │  │  ├─ TaskList.jsx
│  │  │  ├─ TasksOfDay.css
│  │  │  ├─ TasksOfDay.jsx
│  │  │  ├─ UnreadMessages.css
│  │  │  └─ UnreadMessages.jsx
│  │  ├─ Workbench.css
│  │  └─ Workbench.jsx
│  ├─ contexts
│  │  └─ AuthContext.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ services
│  │  ├─ api.js
│  │  ├─ authService.js
│  │  └─ workbenchService.js
│  └─ styles
│     ├─ login.css
│     └─ projects.css
├─ tailwind.config.js
└─ vite.config.js

```