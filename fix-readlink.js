// Fix for Windows D: drive returning EISDIR instead of EINVAL on readlink for regular files.
// This is a known Node.js/Windows filesystem quirk that breaks webpack's enhanced-resolve.
const fs = require('fs');
const path = require('path');

const origReadlink = fs.readlink;
const origReadlinkSync = fs.readlinkSync;

fs.readlink = function (p, ...args) {
  const cb = typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
  if (!cb) return origReadlink.call(fs, p, ...args);
  return origReadlink.call(fs, p, ...args, (err, linkString) => {
    if (err && err.code === 'EISDIR') {
      err.code = 'EINVAL';
      err.errno = -4071;
    }
    cb(err, linkString);
  });
};

fs.readlinkSync = function (p, ...args) {
  try {
    return origReadlinkSync.call(fs, p, ...args);
  } catch (err) {
    if (err.code === 'EISDIR') {
      err.code = 'EINVAL';
      err.errno = -4071;
    }
    throw err;
  }
};

// Also patch graceful-fs if it's loaded
try {
  const gfs = require('graceful-fs');
  if (gfs.readlink && gfs.readlink !== fs.readlink) {
    const origGfsReadlink = gfs.readlink;
    const origGfsReadlinkSync = gfs.readlinkSync;
    
    gfs.readlink = function (p, ...args) {
      const cb = typeof args[args.length - 1] === 'function' ? args.pop() : undefined;
      if (!cb) return origGfsReadlink.call(gfs, p, ...args);
      return origGfsReadlink.call(gfs, p, ...args, (err, linkString) => {
        if (err && err.code === 'EISDIR') {
          err.code = 'EINVAL';
          err.errno = -4071;
        }
        cb(err, linkString);
      });
    };
    
    gfs.readlinkSync = function (p, ...args) {
      try {
        return origGfsReadlinkSync.call(gfs, p, ...args);
      } catch (err) {
        if (err.code === 'EISDIR') {
          err.code = 'EINVAL';
          err.errno = -4071;
        }
        throw err;
      }
    };
  }
} catch (_) {
  // graceful-fs not available, that's fine
}
