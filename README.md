## ⚠️ Notice

This version of `ox_inventory` has been modified to improve compatibility with the latest version of `qb-core`. It is based on a prior QB-compatible fork originally maintained by [@JericoFX](https://github.com/JericoFX), and includes additional updates and enhancements.

Please be aware that the original inventory system is the property of the Overextended team and remains under its original license. All changes in this version aim to retain core functionality while adapting it for modern `qb-core` environments.

**Note:** The Overextended/Cox team does **not** support `qb-core`.  
Please do **not** contact them regarding this modified version.  

This fork exists to provide a more collaborative, community-driven alternative.  
We believe in open-source development where the community has a voice in the direction and evolution of the project, fostering innovation through collective contribution.

Diffrences from other forks:
- Rarity indicators: Visual item classification with colored borders and glow effects based on item rarity (common, uncommon, rare, epic, legendary, artifact, red, pink, gold). This is optional and based on a metadata key of "rarity" with the previously mentioned values

- Added QB-Core compatibility: Full compatibility with modern QB-Core framework has been restored and updated. While the original ox_inventory removed QB-Core support, this fork brings it back with enhanced integration and compatibility for current QB-Core versions, ensuring seamless operation with existing QB-Core servers. This enhancement maintains full compatibility with all other supported frameworks including ESX, ox_core, QBox, and ND_Core - no functionality is lost for existing users of these frameworks.

- Enabled additional extensions by default (jpg, gif, jpeg):  
The application now supports more image file formats out of the box. In addition to any previously supported formats, users can now upload or process images with the `.jpg`, `.gif`, and `.jpeg` extensions without needing to manually configure these options.

- Enabled additional image hosts to be used (img.bb/discord links):  
The application now allows images to be loaded from more external sources. Specifically, links from image hosting services such as `img.bb` and Discord's CDN can be used directly. This makes it easier to work with images stored on these platforms, improving flexibility and compatibility for users who share or embed images from various hosts.

# ox_inventory

A complete inventory system for FiveM, implementing items, weapons, shops, and more without any strict framework dependency.

![](https://img.shields.io/github/downloads/The-Order-Of-The-Sacred-Framework/ox_inventory/total?logo=github)
![](https://img.shields.io/github/downloads/The-Order-Of-The-Sacred-Framework/ox_inventory/latest/total?logo=github)
![](https://img.shields.io/github/contributors/The-Order-Of-The-Sacred-Framework/ox_inventory?logo=github)
![](https://img.shields.io/github/v/release/The-Order-Of-The-Sacred-Framework/ox_inventory?logo=github)

## 📚 Documentation

https://coxdocs.dev/ox_inventory

## 💾 Download

https://github.com/The-Order-Of-The-Sacred-Framework/ox_inventory/releases/latest/download/ox_inventory.zip

## Supported frameworks

We do not guarantee compatibility or support for third-party resources.

- [ox_core](https://github.com/communityox/ox_core)
- [esx](https://github.com/esx-framework/esx_core)
- [qb-core](https://github.com/qbcore-framework/qb-core)
- [qbox](https://github.com/Qbox-project/qbx_core)
- [nd_core](https://github.com/ND-Framework/ND_Core)

## ✨ Features

- Server-side security ensures interactions with items, shops, and stashes are all validated.
- Logging for important events, such as purchases, item movement, and item creation or removal.
- Supports player-owned vehicles, licenses, and group systems implemented by frameworks.
- Fully synchronised, allowing multiple players to [access the same inventory](https://user-images.githubusercontent.com/65407488/230926091-c0033732-d293-48c9-9d62-6f6ae0a8a488.mp4).

### Items

- Inventory items are stored per-slot, with customisable metadata to support item uniqueness.
- Overrides default weapon-system with weapons as items.
- Weapon attachments and ammo system, including special ammo types.
- Durability, allowing items to be depleted or removed overtime.
- Internal item system provides secure and easy handling for item use effects.
- Compatibility with 3rd party framework item registration.

### Shops

- Restricted access based on groups and licenses.
- Support different currency for items (black money, poker chips, etc).

### Stashes

- Personal stashes, linking a stash with a specific identifier or creating per-player instances.
- Restricted access based on groups.
- Registration of new stashes from any resource.
- Containers allow access to stashes when using an item, like a paperbag or backpack.
- Access gloveboxes and trunks for any vehicle.
- Random item generation inside dumpsters and unowned vehicles.

## Copyright

Copyright © 2024 Overextended <https://github.com/overextended>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
