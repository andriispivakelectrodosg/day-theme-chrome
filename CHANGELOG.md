# Changelog

All notable changes to the **Day Theme — New Tab** Chrome extension.

## [0.2.0] - 2026-02-25

### Fixed
- Theme not applying on New Tab — `chrome.storage.sync` serializes keys as strings, but lookups used numeric keys. All keys are now consistently strings (`'0'`–`'6'`).

### Changed
- Extension icon replaced with sun & moon design (golden sun with rays, silver crescent moon with stars on dark background). Generated natively at 16, 48, 128px via Python Pillow.
- Version bumped to 0.2.0.

## [0.1.0] - 2026-02-25

### Added
- Initial release.
- New Tab override with fullscreen gradient background per day of week.
- Centered display: day name, formatted date, live clock (1s update).
- Popup settings with dual color pickers (gradient start/end) for each day.
- "Reset to Defaults" button in popup.
- Configuration persisted via `chrome.storage.sync` (cross-device).
- Default gradients: Monday (indigo-purple), Tuesday (pink-red), Wednesday (blue-cyan), Thursday (green-teal), Friday (pink-yellow), Saturday (lavender-pink), Sunday (peach-orange).
- Icons at 16, 48, 128px.
- Packaged as `.zip` for side-loading and Chrome Web Store upload.
