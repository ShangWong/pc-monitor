客户端部署PowerShell脚本步骤

Step 1. 启动Powershell确认版本 Get-ExecutionPolicy -List
Step 2. Powershell版本过低(2.0)的情况下，需安装更新 https://www.microsoft.com/en-us/download/details.aspx?id=54616
Step 3. 以管理者权限启动Powershell,执行 Set-ExecutionPolicy Unrestricted
Step 4. 开启Task Scheduler，新建lock与release的两个任务。
Step 5. lock任务,触发机制为系统解锁或有登入时，执行lock.ps1脚本
Step 6. release任务,触发机制为系统锁定时，执行release.ps1脚本

objectId需事先在leancloud储存模块中添加相应PC后获取。


--------------------------------------------------------------- 

tcl 5a807db2d50eee0042e10d2b

m1 5a807de59f54540071bcfda1

m2 5a807e00ee920a00445c418d

m3 5a812ca8a22b9d0044bca24b

t1 5a8134bc9f5454005ea6633b

t2 5a8134c9d50eee0042e43820