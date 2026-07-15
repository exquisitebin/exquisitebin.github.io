# Laptop Server Setup

I decided to convert my 10 your old high school laptop into a home server to get some additional use out of it in using it for personal coding projects and home assistant. I plan to install the latest Ubuntu version (Ubuntu Server 26).

## Laptop Specs:
System: Dell Latitude 3350
CPU: Intel Core i3-500U 2.00GHz
Memory: 4GiB DDR3
SSD: 128GB
Network: WIFI, Ethernet, Bluetooth
Existing OS: Windows 10

## Intalling Ubuntu Server 26

### Creating USB Boot Media
The existing OS installed on the laptop is Windows 10. To install the new OS Ubuntu Server 26 I needed to create a USB Boot Media. This requires downloading the ISO image from ubuntu:
https://releases.ubuntu.com/resolute/ubuntu-26.04-live-server-amd64.iso

Creating a Boot Media on Windows will need Rufus which can be downloaded here: https://rufus.ie/en/

Once downloaded you will need a USB of at least 6GB. I grabbed a 16GB USB I had spare, plugged it in and ran Rufus. Select the USB and ISO file:

Device: (USB Device Name)
Boot Selection: Disk or ISO image (Ubuntu Server 26 ISO File)
Target System: BIOS or UEFI
Partition Scheme: MBR
File system: FAT32
Cluster size: 16kb

Press START. It will runs for a while and once done will complete the Boot Media.

### Relevant Installation Documentation
Ubuntu Server Installation documentation: https://ubuntu.com/tutorials/install-ubuntu-server#1-overview
Create ISO Image on Windows: https://ubuntu.com/tutorials/create-a-usb-stick-on-windows#1-overview

### Use Boot Media to Install OS
Plug in the USB into the laptop and restart it. On boot press F12 (or eqiuvalent) to go into the BIOS / Boot Menu.

In my experience I found I needed to restart my laptop multiple times to get the Linux Boot menu. Some additional BIOS settings to ensure that it will work:

- Secure Boot = Disabled

Once I got to the Linux Boot menu and pressed "Try or Install Ubunut Server" I kept having the laptop contuniually shutdown / restart indefinitely to black screens.

To fix this issue I performed these additional steps:
- Highlight "Try or Install Ubuntu Server"
- Press "e" on the keyboard
- On the line beginning `linux /casper/vmlinuz ...` add the `nomodeset`
- E.g. `linux /casper/vmlinuz nomodeset ---`
- Press `Ctrl + X` to save and use the boot parameters

This enabled the system to boot and get to the OS installation form.

### Ubuntu Server 26 Installation Menu

In the installation menu perform the following selections:

#### Language: 
Language: English

#### Keyboard configuration:
Layout: English US
Variant: English US

#### Ubuntu Install:
Select: Ubuntu Server

Additional Options:
Unselect: Search for third party drivers

#### Network Connections:
In my instance my Wifi drivers were not installed properly yet so I skipped this step.

#### Filesystem Setup:
In this step we want to set up the internal drive as the main partition. We want to use the full drive space.

Storage Pool:
Set: ubuntu-vg = 116GB

Logical Volume:
Set: ubuntu-lv = 116GB
Set: / ~= 116GB

Use: ext4

Confirm descructive actions to overwrite the disk.

#### Setup Profile:
Setup your name, server name, user name and password.

#### Install Additional Software:
Since we didn't select internet access we skip this.

#### Installing System:
It will start installing the OS on the system! Once its done we setup the server network connectivity and software.

## Network Connectivity

In attempting to setup the network connectivity I tried several methods of connecting. Each came with their problems that I later realised came down to the laptop's BIOS firmware not being up to date!

### 1.0 wpa_supplicant
I initially wanted to attempt to connect to wifi / internet using the software available on the base Ubuntu OS.

To do this I used wpa_supplicant.

We run ip link to get what connectivity options we have available.
```
ip link

1: lo ...
2: wlp4s0 ...
```
When I ran it I couldn't see any ethernet options - which I found would be a problem later. Using this we can see `wlp4s0` is the WIFI adapter.

Bring up the WIFI.
```
sudo ip link set wlp4s0 up
```

To setup the wpa_supplicant I ran created the following file:
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
# Fill out the following lines in the document and save

ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=AU

network={
    ssid="YOUR_WIFI_NAME"
    psk="YOUR_WIFI_PASSWORD"
}
```
Then start wpa_supplicant:
```
sudo wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf
```
Then run:
```
sudo systemctl restart systemd-networkd

networkctl status wlp4s0

# Check IP
ip a
```

For me the above didn't work. So I went about setting up a different method. I believe this was because my firmware wasn't up to date.

### 2.0 Ethernet

When running ip link I couldn't see any ethernet adapter options.

To do some troubleshooting I performed to following to confirm ethernet is available in the PCI connections:

```
lspci | grep -i ethernet

03:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8111/8168/8211/8411 PCI Express Gigabit Ethernet Controller (rev 15)
```

Check that there are ethernet drivers installed.

```
lsmod | grep r816

r8169
```

This confirms that we have the driver but is it being used?

```
lspci -nnk | grep -A3 -i ethernet

03:00.0 Ethernet controller [0200]: Realtek Semiconductor Co., Ltd. RTL8111/8168/8211/8411 PCI Express Gigabit Ethernet Controller [10ec:8168] (rev 15)
        Subsystem: Dell Device [1028:070c]
        Kernel driver in use: r8169
        Kernel modules: r8169

```

So it seems like the driver is being used but are we hitting any errors.

```
sudo dmesg | grep -i r816

r8169 PCI INT A: failed to register GSI r8169 error -EBUSY: enable failure r8169 probe with driver r8169 failed with error -16 wmi_bus wmi_wub-PNP0C14:00 [Firmware Bug]: WQBC data block query control method not found
```

This showed that it is failing to enable the Ethernet interface / drivers.

It seemed my next best step was to install new software / drivers to fix this issue.

### 3.0 Phone via USB
Next step I tried was providing internet access via USB from my phone.

To do this I connected my phone, and in the USB settings changed the connection to tethering.


























