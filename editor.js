;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory(require('paper'))
  else if (typeof define === 'function' && define.amd) define(['paper'], factory)
  else if (typeof exports === 'object') exports['MetroFlow'] = factory(require('paper'))
  else root['MetroFlow'] = factory(root['paper'])
})(this, function (__WEBPACK_EXTERNAL_MODULE_1__) {
  return /******/ (function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      }) // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__) // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true // Return the exports of the module
      /******/
      /******/ /******/ return module.exports
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function (exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          /******/ configurable: false,
          /******/ enumerable: true,
          /******/ get: getter,
          /******/
        })
        /******/
      }
      /******/
    } // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function (module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default']
            }
          : /******/ function getModuleExports() {
              return module
            }
      /******/ __webpack_require__.d(getter, 'a', getter)
      /******/ return getter
      /******/
    } // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    } // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 14))
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */ // utils.js
      /***/ function (module, exports) {
        var DisplaySettings = {
          isDebug: false,
        }

        function uuidv4() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
              v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
          })
        }

        var Observable = {
          Observable: function () {
            this.observers = []
            return this
          },
          registerObserver: function (observer) {
            var index = this.observers.indexOf(observer)
            if (index === -1) {
              this.observers.push(observer)
            }
          },
          unregisterObserver: function (observer) {
            var index = this.observers.indexOf(observer)
            if (index > -1) {
              this.observers.splice(index, 1)
            }
          },
          notifyAllObservers: function () {
            for (var i = 0; i < this.observers.length; i++) {
              this.observers[i].notify(this)
            }
          },
          notifyBeforeRemove: function () {
            for (var i = 0; i < this.observers.length; i++) {
              this.observers[i].notifyRemove(this)
            }
          },
        }

        function Observer(notify, notifyRemove) {
          return {
            notify: notify,
            notifyRemove: notifyRemove,
          }
        }

        module.exports = {
          DisplaySettings: DisplaySettings,
          Observer: Observer,
          Observable: Observable,
          uuidv4: uuidv4,
        }

        /***/
      },
      /* 1 */
      /***/ function (module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_1__

        /***/
      }, // styles.js
      /* 2 */ /***/ function (module, exports) {
        var fillColor = 'white'
        var strokeWidth = 8
        var stationRadius = 1 * strokeWidth
        // List of track colors
        var trackStrokeColor = [
          '#f67982',
          // '#ff94a4',
          // '#ffbca3',
          '#fff746',
          '#bfe85f',
          '#65d097',
          '#75e6cf',
          '#5cc4ff',
          '#b486ff',
          '#b09494',
          '#E5303C',
          '#F6802C',
          '#FEC91A',
          '#45A844',
          '#3D84CA',
          '#C1477F',
          '#A59D90',
          //'#F4897F',
          '#FFA769',
          '#FFD45C',
          '#74C063',
          '#86D0ED',
          '#BF6992',
          '#BAB4AA',
          '#D8448B',
          '#E57257',
          '#FCAB1D',
          '#45A384',
          '#6285D1',
          //'#9975BC',
          '#999082',
          '#EA83B9',
          //'#E28876',
          '#FFD773',
          '#75BCA2',
          '#85A5DD',
          '#AB90C4',
          '#CCC6BE',
          '#E05865',
          '#EA965C',
          '#F4D069',
          '#73AA72',
          '#5D98C9',
          '#D162A4',
          '#A09D9A',
        ]

        var selectionColor = rgbToHex(0, 100, 0)

        function componentToHex(c) {
          var hex = c.toString(16)
          return hex.length == 1 ? '0' + hex : hex
        }

        function rgbToHex(r, g, b) {
          return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
        }

        function pickTrackStrokeColor(idx) {
          var colors = trackStrokeColor
          return colors[idx]
        }

        var MapStyle = {}

        var TrackStyle = {}

        var SegmentStyle = {
          strokeColor: trackStrokeColor[0],
          strokeWidth: strokeWidth,
          selectionColor: selectionColor,
          fullySelected: false,
        }

        var StationStyle = {
          strokeColor: rgbToHex(0, 0, 0),
          strokeWidth: strokeWidth / 2,
          fillColor: fillColor,
          stationRadius: stationRadius,
          selectionColor: selectionColor,
          fullySelected: false,
        }

        var StationMinorStyle = {
          strokeColor: SegmentStyle.strokeColor,
          strokeWidth: SegmentStyle.strokeWidth,
          selectionColor: selectionColor,
          minorStationSize: SegmentStyle.strokeWidth * 2.0,
          fullySelected: false,
        }

        function createStationStyle() {
          var newStyle = {}
          Object.keys(StationStyle).forEach(function (key) {
            newStyle[key] = StationStyle[key]
          })
          return newStyle
        }

        function createStationMinorStyle() {
          var newStyle = {}
          Object.keys(StationMinorStyle).forEach(function (key) {
            newStyle[key] = StationMinorStyle[key]
          })
          return newStyle
        }

        function createSegmentStyle() {
          var newStyle = {}
          Object.keys(SegmentStyle).forEach(function (key) {
            newStyle[key] = SegmentStyle[key]
          })
          return newStyle
        }

        module.exports = {
          createStationStyle: createStationStyle,
          createSegmentStyle: createSegmentStyle,
          createStationMinorStyle: createStationMinorStyle,
          rgbToHex: rgbToHex,
          pickTrackStrokeColor: pickTrackStrokeColor,
        }

        /***/
      }, // segment.js
      /* 3 */ /***/ function (module, exports, __webpack_require__) {
        util = __webpack_require__(0)

        var arcRadius = 8.0
        var minStraight = 4.0 * arcRadius

        var Segment = {
          Segment: function (stationA, stationB, style) {
            //        console.log('Segment.Segment()', stationA, stationB);
            this.stationA = stationA
            this.stationB = stationB
            this.stations = [stationA, stationB]
            this.stationsAuto = []
            this.stationsUser = [stationA, stationB]
            this.style = style
            this.id = util.uuidv4()
            this.path = null
            this.isSelected = false
            return this
          },
          addStationAuto: function (station) {
            this.stationsAuto.push(station)
            this.stations.push(station)
          },
          addStationUser: function (station) {
            this.stationsUser.push(station)
            this.stations.push(station)
          },
          begin: function () {
            return this.stationA.position
          },
          end: function () {
            return this.stationB.position
          },
          direction: function () {
            return this.end() - this.begin()
          },
          center: function () {
            return this.begin() + (this.end() - this.begin()) / 2
          },
          length: function () {
            return this.path.length
          },
          getOffsetOf: function (position) {
            console.assert(position.x)
            console.assert(this.path, this)
            var position = this.path.getNearestPoint(position)
            return this.path.getOffsetOf(position)
          },
          toggleSelect: function () {
            if (this.isSelected) {
              this.deselect()
            } else {
              this.select()
            }
          },
          select: function () {
            this.isSelected = true
          },
          deselect: function () {
            this.isSelected = false
          },
          removeStation: function (id) {
            var station = this.findStation(id)
            if (!station) {
              return
            }
            var pos = this.stations.indexOf(station)
            if (pos > -1) {
              this.stations.splice(pos, 1)
            }
            pos = this.stationsAuto.indexOf(station)
            if (pos > -1) {
              this.stationsAuto.splice(pos, 1)
            }
            if (this.stationsUser) {
              pos = this.stationsUser.indexOf(station)
              if (pos > -1) {
                this.stationsUser.splice(pos, 1)
              }
            }    
          },
          getAllOnSegmentStations: function () {
            var stations = []
            stations = stations.concat(this.stationsAuto)
            stations = stations.concat(this.stationsUser)
            var pos = stations.indexOf(this.stationA)
            if (pos != -1) {
              stations.splice(pos, 1)
            }
            var pos = stations.indexOf(this.stationB)
            if (pos != -1) {
              stations.splice(pos, 1)
            }
            return stations
          },
          removeAllOnSegmentStations: function () {
            var stationsRemoved = []
            var onSegementStations = this.getAllOnSegmentStations()
            for (var i in onSegementStations) {
              var station = onSegementStations[i]
              var pos = this.stationsAuto.indexOf(station)
              this.stationsAuto.splice(pos, 1)
              pos = this.stationsUser.indexOf(station)
              this.stationsUser.splice(pos, 1)
              stationsRemoved.push(station)
            }
            for (var i in stationsRemoved) {
              var pos = this.stations.indexOf(stationsRemoved[i])
              if (pos != -1) {
                this.stations.splice(pos, 1)
              }
            }
            return stationsRemoved
          },
          createNewPath: function () {
            var path = new Path()
            path.strokeColor = this.style.strokeColor
            if (this.isSelected) {
              path.strokeColor = this.style.selectionColor
            }
            path.strokeWidth = this.style.strokeWidth
            path.strokeCap = 'round'
            path.strokeJoin = 'round'
            path.fullySelected = util.DisplaySettings.isDebug
            return path
          },
          getNearestStation: function (position, direction) {
            console.assert(position.x)
            var offsetPosition = this.getOffsetOf(position)
            var differenceMin = 1.0e99
            var station = null
            var stationOffset = null
            for (var i in this.stationsUser) {
              var offset = this.getOffsetOf(this.stationsUser[i].position)
              var difference = (offset - offsetPosition) * direction
              if (difference > 0 && difference < differenceMin) {
                differenceMin = difference
                station = this.stationsUser[i]
                stationOffset = offset
              }
            }
            return { station: station, offset: stationOffset }
          },
          getNextStation: function (position) {
            var direction = 1
            var stationInfo = this.getNearestStation(position, direction)
            if (!stationInfo.station) {
              stationInfo.station = this.stationB
            }
            return stationInfo
          },
          getPreviousStation: function (position) {
            var direction = -1
            var stationInfo = this.getNearestStation(position, direction)
            if (!stationInfo.station) {
              stationInfo.station = this.stationA
            }
            return stationInfo
          },
          getStationsBetween: function (stationA, stationB) {
            var offsetA = this.getOffsetOf(stationA.position)
            var offsetB = this.getOffsetOf(stationB.position)
            var stations = []
            for (var i in this.stationsAuto) {
              var station = this.stationsAuto[i]
              var offset = this.getOffsetOf(station.position)
              if (offset >= offsetA && offset <= offsetB) {
                stations.push(station)
              }
            }
            return stations
          },
          findStation: function (id) {
            for (var i in this.stations) {
              if (this.stations[i].id == id) {
                return this.stations[i]
              }
            }
            return null
          },
          createPath: function (previous) {
            this.path = null
            var stationVector = this.end() - this.begin()
            var maxDistance = Math.min(Math.abs(stationVector.x), Math.abs(stationVector.y)) - minStraight
            var straightBegin = Math.abs(stationVector.y) - maxDistance
            var straightEnd = Math.abs(stationVector.x) - maxDistance
            straightBegin = Math.max(straightBegin, minStraight)
            straightEnd = Math.max(straightEnd, minStraight)
            // TODO: this is ugly and might not always work, needs to be vector based
            var arcBeginRel = new Point(0, straightBegin) * Math.sign(stationVector.y)
            var arcEndRel = new Point(straightEnd, 0) * Math.sign(stationVector.x)
            if (previous && previous.path) {
              var tangentEndLastPath = previous.path.getTangentAt(previous.path.length)
              var inSameDirectionOutX = Math.sign(stationVector.x) - tangentEndLastPath.x !== 0
              var inSameDirectionOutY = Math.sign(stationVector.y) - tangentEndLastPath.y !== 0
              if (tangentEndLastPath.x !== 0 && !inSameDirectionOutX) {
                arcBeginRel = new Point(straightEnd, 0) * Math.sign(stationVector.x)
                arcEndRel = new Point(0, straightBegin) * Math.sign(stationVector.y)
              } else if (tangentEndLastPath.y !== 0 && inSameDirectionOutY) {
                arcBeginRel = new Point(straightEnd, 0) * Math.sign(stationVector.x)
                arcEndRel = new Point(0, straightBegin) * Math.sign(stationVector.y)
              }
            }
            var differenceXY = Math.abs(Math.abs(stationVector.normalize().x) - Math.abs(stationVector.normalize().y)) // is almost diagonal line?
            var needsArc = differenceXY > 0.02 && Math.abs(stationVector.x) > minStraight + arcRadius * 2 && Math.abs(stationVector.y) > minStraight + arcRadius * 2
            if (needsArc) {
              var arcEnd = this.end() - arcEndRel
              var arcBegin = this.begin() + arcBeginRel
              var beginPoint1 = arcBegin - arcBeginRel.normalize() * arcRadius
              var beginPoint2 = arcBegin + (arcEnd - arcBegin).normalize() * arcRadius
              var endPoint1 = arcEnd - (arcEnd - arcBegin).normalize() * arcRadius
              var endPoint2 = arcEnd + arcEndRel.normalize() * arcRadius

              this.path = this.createNewPath()
              this.path.add(this.begin())
              this.path.add(beginPoint1)
              this.path.quadraticCurveTo(arcBegin, beginPoint2)
              this.path.add(endPoint1)
              this.path.quadraticCurveTo(arcEnd, endPoint2)
              this.path.add(this.end())
            } else {
              this.path = this.createNewPath()
              this.path.add(this.begin())
              this.path.add(this.end())
            }

            if (util.DisplaySettings.isDebug) {
              var debugPointRadius = 4
              var center = stationVector / 2.0 + this.begin()
              var centerCircle = new Path.Circle(center, debugPointRadius)
              centerCircle.strokeWidth = 1
              centerCircle.strokeColor = 'green'
              centerCircle.fillColor = 'green'
              centerCircle.remove()
              var arcBeginCircle = new Path.Circle(arcBegin, debugPointRadius)
              arcBeginCircle.style = centerCircle.style
              arcBeginCircle.strokeColor = 'green'
              arcBeginCircle.fillColor = 'green'
              var arcEndCircle = new Path.Circle(arcEnd, debugPointRadius)
              arcEndCircle.style = arcBeginCircle.style
            }
            this.path.sendToBack()
          },
          draw: function (previous, drawSettings) {
            // console.log('segment.draw()');
            var notifyObservers = !drawSettings.fast
            this.stationA.updatePosition(this, notifyObservers)
            this.stationB.updatePosition(this, notifyObservers)

            this.createPath(previous)

            for (var i in this.stationsUser) {
              var station = this.stationsUser[i]
              station.updatePosition(this, notifyObservers)
            }

            for (var i in this.stationsAuto) {
              var station = this.stationsAuto[i]
              station.updatePosition(this, notifyObservers)
            }
            if (notifyObservers) {
              this.notifyAllObservers(this)
            }
            //        path.fullySelected = true;
            //        return path;
          },
        }

        function createSegment(stationA, stationB, style) {
          console.log('createSegment')
          var observable = Object.create(util.Observable).Observable()
          var segment = Object.assign(observable, Segment)
          segment = segment.Segment(stationA, stationB, style)
          return segment
        }

        module.exports = {
          createSegment: createSegment,
          minStraight: minStraight,
          arcRadius: arcRadius,
        }

        /***/
      }, //map.js
      /* 4 */ /***/ function (module, exports, __webpack_require__) {
        util = __webpack_require__(0)
        metrotrack = __webpack_require__(5)
        metroconnection = __webpack_require__(7)

        var DrawSettings = {
          text: true,
          fast: false,
          calcTextPositions: false,
          minorStationText: false,
        }

        function createDrawSettings() {
          var drawSettings = {}
          Object.keys(DrawSettings).forEach(function (key) {
            drawSettings[key] = DrawSettings[key]
          })
          return drawSettings
        }

        var Map = {
          Map: function () {
            this.tracks = []
            this.connections = []
            return this
          },
          createTrack: function () {
            console.log('map.createTrack()')
            var newTrack = metrotrack.createTrack()
            this.tracks.push(newTrack)
            return newTrack
          },
          createConnection: function (stationA, stationB) {
            console.log('map.createConnection()')
            if (stationA.id === stationB.id) {
              return null
            }
            var newConnection = metroconnection.createConnection(stationA, stationB)
            this.connections.push(newConnection)
            return newConnection
          },
          removeStation: function (id) {
            for (var i in this.tracks) {
              this.tracks[i].removeStation(id)
            }
            for (var i = this.connections.length - 1; i >= 0; i--) {
              if (this.connections[i].stationA.id === id || this.connections[i].stationB.id === id) {
                this.connections.splice(i, 1)
              }
            }
          },
          stations: function () {
            var stations = []
            for (var i in this.tracks) {
              stations = stations.concat(this.tracks[i].stations)
            }
            return stations
          },
          segments: function () {
            var segments = []
            for (var i in this.tracks) {
              segments = segments.concat(this.tracks[i].segments)
            }
            return segments
          },
          draw: function (drawSettings) {
            console.log('map.draw')
            project.clear()
            for (var i in this.tracks) {
              this.tracks[i].draw(drawSettings)
            }
            for (var i in this.connections) {
              this.connections[i].draw()
            }
            if (drawSettings.text) {
              var paths = []
              if (!drawSettings.fast) {
                paths = this.allPaths()
                //console.log('map.draw() paths.length', paths.length)
              }
              this.drawStationNames(paths, drawSettings)
            }
          },
          clear: function () {
            this.tracks = []
          },
          drawStationNames: function (paths, drawSettings) {
            for (var i in this.tracks) {
              this.tracks[i].drawStationNames(paths, drawSettings)
            }
          },
          allPaths: function () {
            var paths = []
            for (var i in this.tracks) {
              paths = paths.concat(this.tracks[i].allPaths())
            }
            for (var i in this.connections) {
              paths = paths.concat(this.connections[i].allPaths())
            }
            return paths
          },
          findStation: function (id) {
            for (var i in this.tracks) {
              var station = this.tracks[i].findStation(id)
              if (station) {
                return station
              }
            }
            return null
          },
          findStationByPathId: function (id) {
            for (var i in this.tracks) {
              var track = this.tracks[i]
              var station = track.findStationByPathId(id)
              if (station) {
                return { station: station, track: track }
              }
            }
            return { station: null, track: null }
          },
          findSegment: function (id) {
            for (var i in this.tracks) {
              var track = this.tracks[i]
              var segment = track.findSegment(id)
              if (segment) {
                return { segment: segment, track: track }
              }
            }
            return { segment: null, track: null }
          },
          findSegmentByPathId: function (id) {
            for (var i in this.tracks) {
              var track = this.tracks[i]
              var segment = track.findSegmentByPathId(id)
              if (segment) {
                return { segment: segment, track: track }
              }
            }
            return { segment: null, track: null }
          },
          findTrack: function (id) {
            for (var i in this.tracks) {
              if (this.tracks[i].id === id) {
                return this.tracks[i]
              }
            }
            return null
          },
          notifyAllStationsAndSegments: function () {
            var stations = this.stations()
            for (var i in stations) {
              stations[i].notifyAllObservers()
            }
            var segments = this.segments()
            for (var i in segments) {
              segments[i].notifyAllObservers()
            }
          },
        }

        function createMap() {
          var observable = Object.create(util.Observable).Observable()
          var map = Object.assign(observable, Map)
          map = map.Map()
          return map
        }

        module.exports = {
          createMap: createMap,
          createDrawSettings: createDrawSettings,
        }

        /***/
      }, // track.js
      /* 5 */ /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(1)
        var util = __webpack_require__(0)
        var metrosegment = __webpack_require__(3)
        var metrostation = __webpack_require__(6)
        var metrostyles = __webpack_require__(2)

        var Track = {
          Track: function () {
            this.segments = []
            this.id = util.uuidv4()
            this.stations = []
            this.stationsMajor = []
            this.stationsMinor = []
            this.segmentStyle = metrostyles.createSegmentStyle()
            this.stationStyle = metrostyles.createStationStyle()
            this.stationMinorStyle = metrostyles.createStationMinorStyle()
            this.stationMinorStyle.strokeColor = this.segmentStyle.strokeColor
            return this
          },
          setStationRadius: function (radius) {
            this.stationStyle.stationRadius = radius
          },
          setStationStrokeWidth: function (strokeWidth) {
            this.stationStyle.strokeWidth = strokeWidth
          },
          setSegmentStyle: function (style) {
            this.segmentStyle = style
            this.stationMinorStyle.strokeWidth = this.segmentStyle.strokeWidth
            this.stationMinorStyle.strokeColor = this.segmentStyle.strokeColor
            this.stationMinorStyle.minorStationSize = this.segmentStyle.strokeWidth * 2.0
          },
          setStationStyle: function (style) {
            this.stationStyle = style
          },
          createStationFree: function (position, previousStation) {
            var station = metrostation.createStationFree(position, this.stationStyle)
            if (previousStation) {
              this.createSegment(previousStation, station)
            }
            this.stations.push(station)
            this.stationsMajor.push(station)
            console.log('create station', station.id)
            this.notifyAllObservers()
            return station
          },
          createStationOnSegment: function (segment, offsetFactor) {
            var station = metrostation.createStationSegment(offsetFactor, this.stationStyle)
            this.stations.push(station)
            this.stationsMajor.push(station)
            segment.addStationUser(station)
            this.notifyAllObservers()
            return station
          },
          createSegment: function (stationA, stationB) {
            console.log('track.createSegment', stationA.id, stationB.id)
            var segment = metrosegment.createSegment(stationA, stationB, this.segmentStyle)
            this.segments.push(segment)
            this.notifyAllObservers()
            return segment
          },
          createStationMinorOnSegmentId: function (position, segmentId) {
            var segment = this.findSegment(segmentId)
            position = segment.path.getNearestPoint(position)
            return this.createStationMinor(position, segment)
          },
          createStationMinor: function (position, segment) {
            var station = metrostation.createStationMinor(position, segment.stationA, segment.stationB, this.stationMinorStyle)
            segment.addStationAuto(station)
            station.setPosition(position, segment)
            this.stations.push(station)
            this.stationsMinor.push(station)
            this.notifyAllObservers()
            return station
          },
          segmentToStation: function (station) {
            for (var i in this.segments) {
              var segment = this.segments[i]
              if (segment.stationB.id === station.id) {
                return segment
              }
            }
            return null
          },
          segmentFromStation: function (station) {
            for (var i in this.segments) {
              var segment = this.segments[i]
              if (segment.stationA.id === station.id) {
                return segment
              }
            }
            return null
          },
          lastAddedStation: function () {
            if (this.stationsMajor.length === 0) {
              return null
            }
            return this.stationsMajor[this.stationsMajor.length - 1]
          },
          connectedStations: function (station) {
            var stations = []
            for (var i in this.segments) {
              var segment = this.segments[i]
              if (station.id === segment.stationA.id) {
                stations.push(segment.stationB)
              }
              if (station.id === segment.stationB.id) {
                stations.push(segment.stationA)
              }
            }
            return stations
          },
          allPaths: function () {
            var paths = []
            for (var i in this.segments) {
              paths.push(this.segments[i].path)
            }
            return paths
          },
          draw: function (drawSettings) {
            // console.log('track.draw()');
            for (var i in this.segments) {
              var segment = this.segments[i]
              var previous = this.segmentToStation(segment.stationA)
              segment.draw(previous, drawSettings)
            }
            for (var i in this.stationsMinor) {
              var stationMinor = this.stationsMinor[i]
              var segment = this.findSegmentForStationMinor(stationMinor)
              this.stationsMinor[i].draw(segment)
            }
            for (var i in this.stationsMajor) {
              this.stationsMajor[i].draw()
            }
            // this.notifyAllObservers(this);
          },
          createText: function (station, positionRelative) {
            var text = new PointText(station.position + positionRelative)
            text.justification = 'left'
            text.fillColor = 'black'
            text.content = station.name
            return text
          },
          preventIntersectionSegments: function (text, station, paths, positions) {
            if (!paths) {
              return positions[0]
            }
            var positionsTried = 0
            var intersects = true
            while (intersects && positionsTried < positions.length) {
              intersects = false
              for (var j in paths) {
                if (positionsTried >= positions.length - 1) {
                  break
                }
                var path = paths[j]
                intersects = text.intersects(path)
                if (intersects) {
                  var textOld = text
                  positionsTried++
                  text = this.createText(station, positions[positionsTried])
                  text.fontSize = textOld.fontSize
                  textOld.remove()
                  break
                }
              }
            }
            return positions[positionsTried]
          },
          drawStationNames: function (paths, drawSettings) {
            var fontSize = 14
            this.drawMajorStationNames(paths, fontSize, drawSettings.calcTextPositions)
            fontSize = 10
            if (drawSettings.minorStationText) {
              this.drawMinorStationNames(fontSize)
            }
          },
          drawMajorStationNames: function (paths, fontSize, calcTextPositions) {
            for (var i in this.stationsMajor) {
              var station = this.stationsMajor[i]
              if (!calcTextPositions && station.textPositionRel) {
                text = this.createText(station, station.textPositionRel)
                text.fontSize = fontSize
                continue
              }
              var stationRadius = station.style.stationRadius + station.style.strokeWidth
              var defaultPosition = new Point(stationRadius, fontSize / 4.0)
              var text = this.createText(station, defaultPosition)
              text.fontSize = fontSize
              if (!calcTextPositions) {
                continue
              } else {
                console.log('recalc best text position')
                var positions = []
                positions.push(defaultPosition)
                positions.push(new Point(-stationRadius - text.bounds.width, fontSize / 4.0))
                positions.push(new Point(0, -stationRadius * 1.2))
                positions.push(new Point(stationRadius, -stationRadius * 0.8))
                positions.push(new Point(-text.bounds.width, -stationRadius * 1.2))
                positions.push(new Point(-text.bounds.width - stationRadius, -stationRadius * 0.8))
                positions.push(new Point(0, stationRadius * 2.2))
                positions.push(new Point(stationRadius, stationRadius * 1.4))
                positions.push(new Point(-text.bounds.width, stationRadius * 2.2))
                positions.push(new Point(-text.bounds.width - stationRadius, stationRadius * 1.2))
                var pathsToUse = paths
                if (paths.length === 0) {
                  pathsToUse = this.stationSegmentPaths(station)
                }
                station.textPositionRel = this.preventIntersectionSegments(text, station, pathsToUse, positions)
              }
            }
          },
          stationSegmentPaths: function (station) {
            var segmentTo = this.segmentToStation(station)
            var segmentFrom = this.segmentFromStation(station)
            var segments = []
            if (segmentTo) {
              segments.push(segmentTo)
            }
            if (segmentFrom) {
              segments.push(segmentFrom)
            }
            var pathsLocal = []
            for (var i in segments) {
              for (var j in segments[i].paths) {
                pathsLocal.push(segments[i].paths[j])
              }
            }
            return pathsLocal
          },
          drawMinorStationNames: function (fontSize) {
            for (var i in this.stationsMinor) {
              var station = this.stationsMinor[i]
              var stationLineDirection = station.direction()
              var xOffset = 0
              var position = station.direction() * station.style.minorStationSize * 1.2
              var text = this.createText(station, position)
              text.fontSize = fontSize
              if (stationLineDirection.x < 0) {
                xOffset = -text.bounds.width
                text.position += new Point(xOffset, 0)
              }
              if (stationLineDirection.y > 0.01) {
                yOffset = text.bounds.height / 1.5
                text.position += new Point(0, yOffset)
              }
            }
          },
          findStationByPathId: function (id) {
            for (var i in this.stations) {
              var stationId = this.stations[i].path.id
              if (stationId === id) {
                return this.stations[i]
              }
            }
            return null
          },
          findStation: function (id) {
            for (var i in this.stations) {
              if (this.stations[i].id == id) {
                return this.stations[i]
              }
            }
            return null
          },
          removeStation: function (id) {
            console.log('track.removeStation() on track:', this.id)
            function removeFromTrackState(track, id) {
              var station = track.findStation(id)
              if (station) {
                console.log('track.removeStation()', station)
                var pos = track.stations.indexOf(station)
                if (pos > -1) {
                  station.notifyBeforeRemove()
                  track.stations.splice(pos, 1)
                }
                pos = track.stationsMajor.indexOf(station)
                if (pos > -1) {
                  station.notifyBeforeRemove()
                  track.stationsMajor.splice(pos, 1)
                }
                pos = track.stationsMinor.indexOf(station)
                if (pos > -1) {
                  station.notifyBeforeRemove()
                  track.stationsMinor.splice(pos, 1)
                }
                if (this.stationsUser) {
                  pos = this.stationsUser.indexOf(station)
                  if (pos > -1) {
                    this.stationsUser.splice(pos, 1)
                  }
                }  
              }
            }
            removeFromTrackState(this, id)
            for (var i = this.segments.length - 1; i >= 0; i--) {
              // loop backwards because we splice the array
              var segment = this.segments[i]
              if (segment.stationA.id === id || segment.stationB.id === id) {
                var pos = this.segments.indexOf(segment)
                if (pos > -1) {
                  var stationsRemoved = segment.removeAllOnSegmentStations()
                  for (var j in stationsRemoved) {
                    removeFromTrackState(this, stationsRemoved[j].id)
                  }
                  this.segments.splice(pos, 1)
                }
              } else {
                segment.removeStation(id)
              }
            }
            return
          },
          findSegmentByPathId: function (id) {
            for (var i in this.segments) {
              if (this.segments[i].path.id === id) {
                return this.segments[i]
              }
            }
            return null
          },
          findSegment: function (id) {
            for (var i in this.segments) {
              if (this.segments[i].id === id) {
                return this.segments[i]
              }
            }
            return null
          },
          findSegmentBetweenStations: function (stationA, stationB) {
            for (var i in this.segments) {
              if (stationA.id === this.segments[i].stationA.id && stationB.id === this.segments[i].stationB.id) {
                return this.segments[i]
              }
            }
            return null
          },
          findSegmentForStationMinor: function (stationMinor) {
            return this.findSegmentBetweenStations(stationMinor.stationA, stationMinor.stationB)
          },
          findSegmentsForStation: function (station) {
            var segments = []
            for (var i in this.segments) {
              var index = this.segments[i].stations.indexOf(station)
              if (index != -1) {
                segments.push(this.segments[i])
              }
            }
            return segments
          },
        }

        function createTrack() {
          var observable = Object.create(util.Observable).Observable()
          var track = Object.assign(observable, Track)
          track = track.Track()
          return track
        }

        module.exports = {
          createTrack: createTrack,
        }

        /***/
      }, // station.js
      /* 6 */ /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(1)
        util = __webpack_require__(0)
        styles = __webpack_require__(2)

        var Station = {
          Station: function (position, style) {
            console.log('new station for point', position)
            this.position = position
            this.offsetFactor = null
            this.style = style
            this.id = util.uuidv4().substring(0, 8)
            this.path = null
            this.isSelected = false
            this.name = 'station-' + this.id
            this.textPositionRel = null
            this.doSnap = true
            return this
          },
          toggleSelect: function () {
            if (this.isSelected) {
              this.deselect()
            } else {
              this.select()
            }
          },
          select: function () {
            this.isSelected = true
          },
          deselect: function () {
            this.isSelected = false
          },
          setPosition: function (position, segment) {
            this.doSetPosition(position, segment)
            this.textPositionRel = null
            this.notifyAllObservers()
          },
        }

        var StationPainter = {
          draw: function () {
            this.path = new Path.Circle(this.position, this.style.stationRadius)
            if (this.isSelected) {
              this.path.strokeColor = this.style.selectionColor
            } else {
              this.path.strokeColor = this.style.strokeColor
            }
            this.path.strokeWidth = this.style.strokeWidth
            if (this.offsetFactor) {
              this.path.strokeWidth = 2
            }
            this.path.fillColor = this.style.fillColor
            this.path.bringToFront()
          },
        }

        var StationMinorPainter = {
          draw: function (segment) {
            var minorStationSize = this.style.minorStationSize
            this.path = new Path.Line(this.position, this.position + this.normalUnit * minorStationSize)
            this.path.strokeColor = this.style.strokeColor
            this.path.strokeWidth = this.style.strokeWidth
            // this.path.fillColor = this.style.fillColor;
          },
          direction: function () {
            return (this.path.lastSegment.point - this.path.firstSegment.point).normalize()
          },
        }

        var StationPositionSegmentAuto = {
          doSetPosition: function (position, segment) {
            this.position = position
          },
          updatePosition: function (segment, notifyObservers) {
            // console.log('=======================================');
            // console.log('StationPositionSegmentAuto.updatePosition');
            // console.log('this.position', this.position);
            // console.log('segment', segment);
            var offsetFactor = segment.getOffsetOf(this.position) / segment.length()
            var offset = segment.path.length * offsetFactor
            this.position = segment.path.getPointAt(offset)
            var previousStationInfo = segment.getPreviousStation(this.position)
            // console.log('previousStationInfo', previousStationInfo.station.id);
            var offsetA = previousStationInfo.offset
            var nextStationInfo = segment.getNextStation(this.position)
            var stationsAuto = segment.getStationsBetween(previousStationInfo.station, nextStationInfo.station)
            var nStations = stationsAuto.length
            var offsetB = nextStationInfo.offset
            // console.log('nextStationInfo', nextStationInfo.station.id);
            var totalLength = offsetB - offsetA
            // console.log('totalLength', totalLength);
            // console.log('segment.length', segment.length());
            var distanceBetweenStations = totalLength / (nStations + 1)
            var orderNr = stationsAuto.indexOf(this)
            var stationOffset = distanceBetweenStations * (orderNr + 1) + offsetA
            // console.log('stationsAuto', stationsAuto);
            // console.log('orderNr', orderNr);
            // console.log('stationOffset', stationOffset);
            var position = segment.path.getPointAt(stationOffset)
            console.assert(position)
            if (position) {
              this.position = position
            }
            this.offsetFactor = segment.getOffsetOf(position) / segment.length()
            // console.log('segment.getOffsetOf(this.position)', segment.getOffsetOf(this.position));
            // console.log('offsetFactor', this.offsetFactor);
            this.normalUnit = segment.path.getNormalAt(stationOffset)
            if (notifyObservers) {
              this.notifyAllObservers()
            }
            return this.position
          },
        }

        var StationPositionSegmentUser = {
          doSetPosition: function (position, segment) {
            this.offsetFactor = segment.getOffsetOf(position) / segment.length()
          },
          updatePosition: function (segment, notifyObservers) {
            var distanceStation = segment.path.length * this.offsetFactor
            this.position = segment.path.getPointAt(distanceStation)
            if (notifyObservers) {
              this.notifyAllObservers()
            }
            return this.position
          },
        }

        var StationPositionFree = {
          doSetPosition: function (position, segment) {
            this.position = position
          },
          updatePosition: function (segment, notifyObservers) {
            if (notifyObservers) {
              this.notifyAllObservers()
            }
            return this.position
          },
        }

        function createStationFree(position, style) {
          var observable = Object.create(util.Observable).Observable()
          var station = Object.assign(observable, Station, StationPositionFree, StationPainter)
          if (!style) {
            style = styles.createStationStyle()
          }
          station = station.Station(position, style)
          return station
        }

        function createStationSegment(offsetFactor, style) {
          console.log('createStationMinor')
          var observable = Object.create(util.Observable).Observable()
          var station = Object.assign(observable, Station, StationPositionSegmentUser, StationPainter)
          station = station.Station(new Point(0, 0), style)
          station.offsetFactor = offsetFactor
          station.doSnap = false
          return station
        }

        function createStationMinor(position, stationA, stationB, style) {
          console.log('createStationMinor')
          var observable = Object.create(util.Observable).Observable()
          var station = Object.assign(observable, Station, StationPositionSegmentAuto, StationMinorPainter)
          station = station.Station(position, style)
          station.stationA = stationA
          station.stationB = stationB
          station.name = 'minor station-' + station.id
          station.doSnap = false
          return station
        }

        module.exports = {
          createStationFree: createStationFree,
          createStationSegment: createStationSegment,
          createStationMinor: createStationMinor,
        }

        /***/
      }, // connection.js
      /* 7 */ /***/ function (module, exports, __webpack_require__) {
        util = __webpack_require__(0)
        styles = __webpack_require__(2)

        var Connection = {
          Connection: function (stationA, stationB) {
            this.stationA = stationA
            this.stationB = stationB
            this.id = util.uuidv4()
            this.paths = []
            return this
          },
          allPaths: function () {
            return this.paths
          },
          draw: function () {
            var stationRadiusA = this.stationA.style.stationRadius
            var stationRadiusB = this.stationB.style.stationRadius
            var stationStrokeWidthA = this.stationA.style.strokeWidth
            var stationStrokeWidthB = this.stationB.style.strokeWidth
            var stationStrokeWidth = Math.min(stationStrokeWidthA, stationStrokeWidthB)
            var stationRadius = Math.min(stationRadiusA, stationRadiusB)
            var difference = this.stationB.position - this.stationA.position
            var size = new Size(difference.length - stationRadius, stationRadius - stationStrokeWidth / 2)
            var offset = new Point(-stationRadius / 2, stationRadius / 2 - stationStrokeWidth / 4)
            var rectangle = new Path.Rectangle(this.stationA.position - offset, size)
            rectangle.fillColor = styles.rgbToHex(255, 255, 255)
            rectangle.strokeWidth = 0
            rectangle.rotate(difference.angle, this.stationA.position)
            var offset = (difference.normalize().rotate(90) * stationRadius) / 2
            var offsetA1 = offset + difference.normalize() * (stationRadiusA - stationStrokeWidthA / 2)
            var offsetB1 = offset - difference.normalize() * (stationRadiusB - stationStrokeWidthB / 2)
            var offsetA2 = offset - difference.normalize() * (stationRadiusA - stationStrokeWidthA / 2)
            var offsetB2 = offset + difference.normalize() * (stationRadiusB - stationStrokeWidthB / 2)
            var line1 = new Path(this.stationA.position + offsetA1, this.stationB.position + offsetB1)
            var line2 = new Path(this.stationA.position - offsetA2, this.stationB.position - offsetB2)
            line1.strokeColor = this.stationA.style.strokeColor
            line2.strokeColor = this.stationA.style.strokeColor
            line1.strokeWidth = stationStrokeWidth
            line2.strokeWidth = stationStrokeWidth
            this.paths = []
            this.paths.push(rectangle)
            this.paths.push(line1)
            this.paths.push(line2)
          },
        }

        function createConnection(stationA, stationB) {
          var observable = Object.create(util.Observable).Observable()
          var connection = Object.assign(observable, Connection)
          connection = connection.Connection(stationA, stationB)
          return connection
        }

        module.exports = {
          createConnection: createConnection,
        }

        /***/
      }, // serialize.js
      /* 8 */ /***/ function (module, exports, __webpack_require__) {
        var metromap = __webpack_require__(4)

        // Save map json for paper.js
        function saveMap(map, serialize) {
          var mapData = {}
          mapData.tracks = []
          mapData.connections = []
          for (var i in map.tracks) {
            // skip empty lines
            if (map.tracks[i].segments.length == 0) continue
            var trackData = createTrackData(map.tracks[i])
            mapData.tracks.push(trackData)
          }
          for (var i in map.connections) {
            var connectionData = createConnectionData(map.connections[i])
            mapData.connections.push(connectionData)
          }
          console.log(mapData)
          // if serialize is true, convert json to string
          if (serialize) {
            var mapJSONString = JSON.stringify(mapData)
            return mapJSONString
          } else {
            return mapData
          }
        }

        // Save map json for d3
        function saveMapD3(map, serialize) {
          var mapData = {}
          mapData.lines = []
          mapData.stations = []
          var stations = []
          for (var i in map.tracks) {
            // skip empty lines
            if (map.tracks[i].segments.length == 0) continue
            var trackData = createTrackDataJson(map.tracks[i])
            if (!trackData) return
            mapData.lines.push(trackData.line)
            stations = stations.concat(trackData.d3stations)
          }
          var textLabels = getLabelsJson()
          var uniqueObject = {}
          for (var i in stations) {
            objId = stations[i]['id']
            uniqueObject[objId] = stations[i]
            uniqueObject[objId]['labelPosition'] = textLabels[stations[i]['name']]
          }
          for (i in uniqueObject) {
            mapData.stations.push(uniqueObject[i])
          }

          console.log(mapData)

          if (serialize) {
            var mapJSONString = JSON.stringify(mapData)
            return mapJSONString
          } else {
            return mapData
          }
        }

        function getLabelsJson() {
          var pointTexts = project.getItems({
            class: PointText,
          })
          var obj = {}
          for (var i in pointTexts) {
            obj[pointTexts[i].content] = [pointTexts[i].point.x, pointTexts[i].point.y]
          }
          return obj
        }

        function createTrackDataJson(track) {
          var trackData = {}
          trackData.id = track.id
          trackData.segmentStyle = track.segmentStyle
          trackData.stationStyle = track.stationStyle
          trackData.segments = []
          trackData.stationsMinor = []
          trackData.line = {}
          trackData.line.color = track.segmentStyle.strokeColor
          trackData.line.name = track.id
          trackData.line.stations = []
          trackData.d3stations = []
          // get all paper.js path segments on this track
          var segmentsOnTrack = project.getItems({
            strokeColor: trackData.segmentStyle.strokeColor,
            class: Path,
          })
          for (var j in track.segments) {
            var segmentData = createSegmentDataJson(track.segments[j])
            trackData.segments.push(segmentData)
          }
          var dict = [],
            obj = {}
          // create an object, key is station point position, value is a list of station points (and the segment) that connect to the key station.
          for (var i in segmentsOnTrack) {
            var len = segmentsOnTrack[i].segments.length
            // Get first/last points on this segment, which are the stations of this segment, other points are for paths
            var first = segmentsOnTrack[i].segments[0].point.toString()
            var last = segmentsOnTrack[i].segments[len - 1].point.toString()
            //
            obj[first] ? obj[first].push({ id: last, seg: segmentsOnTrack[i].segments }) : (obj[first] = [{ id: last, seg: segmentsOnTrack[i].segments }])
            obj[last] ? obj[last].push({ id: first, seg: segmentsOnTrack[i].segments }) : (obj[last] = [{ id: first, seg: segmentsOnTrack[i].segments }])

            // In dict, find station points that occur only once, which will be the first and last station on this track
            var index = dict.indexOf(first)
            if (index > -1) {
              dict.splice(index, 1)
            } else {
              dict.push(first)
            }

            index = dict.indexOf(last)
            if (index > -1) {
              dict.splice(index, 1)
            } else {
              dict.push(last)
            }
          }
          console.log(dict)
          console.log(obj)

          if (dict.length != 2) {
            // There should only be two stations (first/last) left in dict. Otherwise, it's wrong.
            return
          }

          // pick dict[1] as start station
          var start = getd3Station(track.stations, dict[1])

          trackData.d3stations.push(start)
          trackData.line.stations.push(start.id)
          var prev, target
          current = dict[1]
          var path = []
          // loop through the object to order path between the stations
          while (current !== dict[0]) {
            var idx = obj[current][0].id == prev ? 1 : 0
            target = getd3Station(track.stations, obj[current][idx].id)
            trackData.d3stations.push(target)
            trackData.line.stations.push(target.id)
            var currentPath = obj[current][idx].seg
            if (currentPath[0].point.toString() !== current) {
              currentPath = currentPath.reverse()
            }
            currentPath.pop()
            console.log(currentPath)
            currentPath = currentPath.map(function (p) {
              return [p.point.x, p.point.y]
            })
            path = path.concat(currentPath)
            console.log(path)
            prev = current
            current = obj[current][idx].id
          }

          path.push(target.position)
          console.log(path)

          trackData.line.paths = [path]

          return trackData
        }

        function getd3Station(stations, posStr) {
          var target = stations.find(function (station) {
            return station.position.toString() === posStr
          })
          return {
            id: target.id,
            name: target.name,
            position: getCoordinate(target),
          }
        }

        function getCoordinate(target) {
          return [target.position.x, target.position.y]
        }

        function createSegmentDataJson(segment) {
          var stationsUserData = []
          for (var i in segment.stationsUser) {
            stationsUserData.push(createStationDataJson(segment.stationsUser[i]))
          }
          var segmentData = {
            stationA: createStationDataJson(segment.stationA),
            stationB: createStationDataJson(segment.stationB),
            stationsUser: stationsUserData,
            // stationsAuto: stationsAutoData,
            id: segment.id,
          }

          return segmentData
        }

        function createStationDataJson(station) {
          var stationData = {
            position: { x: station.position.x, y: station.position.y },
            id: station.id,
            name: station.name,
            offsetFactor: station.offsetFactor,
          }
          return stationData
        }

        function createTrackData(track) {
          var trackData = {}
          trackData.id = track.id
          trackData.segmentStyle = track.segmentStyle
          trackData.stationStyle = track.stationStyle
          trackData.segments = []
          trackData.stationsMinor = []
          for (var j in track.segments) {
            var segmentData = createSegmentData(track.segments[j])
            trackData.segments.push(segmentData)
          }
          return trackData
        }

        function createConnectionData(connection) {
          var connectionData = {
            stationA: connection.stationA.id,
            stationB: connection.stationB.id,
            id: connection.id,
          }
          return connectionData
        }

        function createSegmentData(segment) {
          var stationsUserData = []
          for (var i in segment.stationsUser) {
            stationsUserData.push(createStationData(segment.stationsUser[i]))
          }
          var stationsAutoData = []
          for (var i in segment.stationsAuto) {
            stationsAutoData.push(createStationData(segment.stationsAuto[i]))
          }
          var segmentData = {
            stationA: createStationData(segment.stationA),
            stationB: createStationData(segment.stationB),
            stationsUser: stationsUserData,
            stationsAuto: stationsAutoData,
            id: segment.id,
          }
          return segmentData
        }

        function createStationData(station) {
          var stationData = {
            position: { x: station.position.x, y: station.position.y },
            id: station.id,
            name: station.name,
            offsetFactor: station.offsetFactor,
          }
          return stationData
        }

        function createStationMinorData(station) {
          var stationData = {
            position: { x: station.position.x, y: station.position.y },
            id: station.id,
            name: station.name,
            stationA: station.stationA.id,
            stationB: station.stationB.id,
          }
          return stationData
        }

        function loadMap(mapJSON) {
          console.log('loadMap')
          if (!mapJSON) {
            mapJSON = '{"tracks":[{"id":"3794c750-6605-49df-b810-aa5b0ebb42e8","segmentStyle":{"strokeColor":"red","strokeWidth":8,"selectionColor":"green","fullySelected":false},"stations":[{"position":{"x":152,"y":239},"id":"3fe7243d","name":"station"},{"position":{"x":687,"y":495},"id":"995a2376","name":"station"}],"stationsMinor":[]},{"id":"6fe22ae9-cd61-4705-aa2d-c457e11901e9","segmentStyle":{"strokeColor":"blue","strokeWidth":8,"selectionColor":"green","fullySelected":false},"stations":[{"position":{"x":174,"y":142},"id":"8cb86074","name":"station"},{"position":{"x":764,"y":433},"id":"882322b8","name":"station"}],"stationsMinor":[]}]}'
            mapJSON = JSON.parse(mapJSON)
          }
          var map = metromap.createMap()
          for (var i in mapJSON.tracks) {
            var track = loadTrack(map, mapJSON.tracks[i])
          }
          for (var i in mapJSON.connections) {
            var connection = loadConnections(map, mapJSON.connections[i])
          }
          console.log('map')
          console.log(map)
          return map
        }

        function loadConnections(map, connectionData) {
          console.log('load connections')
          var stationA = map.findStation(connectionData.stationA)
          var stationB = map.findStation(connectionData.stationB)
          var connection = map.createConnection(stationA, stationB)
          if (connection) {
            connection.id = connectionData.id
          }
          return connection
        }

        function loadTrack(map, trackData) {
          console.log('load track')
          var track = map.createTrack()
          track.id = trackData.id
          track.setSegmentStyle(trackData.segmentStyle)
          track.setStationStyle(trackData.stationStyle)
          for (var i in trackData.segments) {
            var segmentData = trackData.segments[i]
            loadSegment(map, track, segmentData)
          }
          track.notifyAllObservers()
          return track
        }

        function loadSegment(map, track, segmentData) {
          console.log('load segment')
          var stationAPoint = new Point(segmentData.stationA.position.x, segmentData.stationA.position.y)
          var stationBPoint = new Point(segmentData.stationB.position.x, segmentData.stationB.position.y)
          var stationA = map.findStation(segmentData.stationA.id)
          var stationB = map.findStation(segmentData.stationB.id)
          var segment = null
          if (stationA && stationB) {
            segment = track.createSegment(stationA, stationB)
          } else if (stationA) {
            stationB = track.createStationFree(stationBPoint, stationA)
            stationB.id = segmentData.stationB.id
            stationB.name = segmentData.stationB.name
            segment = track.findSegmentsForStation(stationB)[0]
          } else if (stationB) {
            stationA = track.createStationFree(stationAPoint)
            stationA.id = segmentData.stationA.id
            stationA.name = segmentData.stationA.name
            segment = track.createSegment(stationA, stationB)
          } else {
            stationA = track.createStationFree(stationAPoint)
            stationA.id = segmentData.stationA.id
            stationA.name = segmentData.stationA.name
            stationB = track.createStationFree(stationBPoint)
            stationB.id = segmentData.stationB.id
            stationB.name = segmentData.stationB.name
            segment = track.createSegment(stationA, stationB)
          }
          if (!track.stations.includes(stationA)) {
            track.stations.push(stationA)
          }
          if (!track.stations.includes(stationB)) {
            track.stations.push(stationB)
          }
          console.assert(segment)

          for (var i in segmentData.stationsUser) {
            var stationData = segmentData.stationsUser[i]
            if (segment.stationA.id === stationData.id || segment.stationB.id === stationData.id) {
              continue
            }
            var offsetFactor = segmentData.offsetFactor
            var station = track.createStationOnSegment(segment, offsetFactor)
            station.offsetFactor = stationData.offsetFactor
            station.id = stationData.id
            station.name = stationData.name
          }

          for (var i in segmentData.stationsAuto) {
            var stationData = segmentData.stationsAuto[i]
            var station = track.createStationMinor(stationData.position, segment)
            station.id = stationData.id
            station.name = stationData.name
          }
        }

        module.exports = {
          saveMap: saveMap,
          loadMap: loadMap,
          saveMapD3: saveMapD3,
        }

        /***/
      }, // metroflow.js
      /* 9 */ /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(1)

        var util = __webpack_require__(0)
        var map = __webpack_require__(4)
        var track = __webpack_require__(5)
        var segment = __webpack_require__(3)
        var station = __webpack_require__(6)
        var connection = __webpack_require__(7)
        var styles = __webpack_require__(2)
        var snap = __webpack_require__(10)
        var serialize = __webpack_require__(8)
        var revision = __webpack_require__(11)
        var zoom = __webpack_require__(12)
        var interaction = __webpack_require__(13)

        module.exports = {
          util: util,
          map: map,
          track: track,
          segment: segment,
          station: station,
          connection: connection,
          snap: snap,
          styles: styles,
          serialize: serialize,
          revision: revision,
          interaction: interaction,
          zoom: zoom,
        }

        /***/
      }, // snap.js
      /* 10 */ /***/ function (module, exports, __webpack_require__) {
        util = __webpack_require__(0)
        metrosegment = __webpack_require__(3)

        function snapPosition(track, station, position) {
          var snapDistance = metrosegment.minStraight + metrosegment.arcRadius * 2.0
          var stations = track.connectedStations(station)
          if (stations.length === 0 && track.lastAddedStation()) {
            stations.push(track.lastAddedStation())
          }
          var nearestX = null
          var nearestY = null
          var minDistanceX = 1e99
          var minDistanceY = 1e99
          for (var i in stations) {
            var stationVector = position - stations[i].position
            var deltaX = Math.abs(stationVector.x)
            if (deltaX < minDistanceX) {
              nearestX = stations[i]
              minDistanceX = deltaX
            }
            var deltaY = Math.abs(stationVector.y)
            if (deltaY < minDistanceY) {
              nearestY = stations[i]
              minDistanceY = deltaY
            }
          }
          var snapX = position.x
          if (minDistanceX < snapDistance) {
            snapX = nearestX.position.x
          }
          var snapY = position.y
          if (minDistanceY < snapDistance) {
            snapY = nearestY.position.y
          }
          return new Point(snapX, snapY)
        }

        module.exports = {
          snapPosition: snapPosition,
        }

        /***/
      }, // revision.js
      /* 11 */ /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(1)
        util = __webpack_require__(0)
        serialize = __webpack_require__(8)

        var maxRevisions = 100
        var revisions = []
        var currentRevision = -1

        function createRevision(map) {
          console.log('createRevision')
          currentRevision++
          var mapDataString = serialize.saveMap(map, true)
          if (currentRevision >= revisions.length) {
            revisions.push(mapDataString)
          } else {
            revisions[currentRevision] = mapDataString
            revisions.splice(currentRevision + 1, revisions.length - currentRevision - 1)
          }
          while (revisions.length > maxRevisions) {
            revisions.shift()
            currentRevision--
          }
          console.log('currentRevision', currentRevision)
        }

        function undo(map) {
          if (currentRevision <= 0) {
            return map
          }
          currentRevision--
          var last = revisions[currentRevision]
          map = serialize.loadMap(JSON.parse(last))
          return map
        }

        function redo(map) {
          if (currentRevision + 1 >= revisions.length) {
            return map
          }
          currentRevision++
          var next = revisions[currentRevision]
          map = serialize.loadMap(JSON.parse(next))
          return map
        }

        function hasUndo() {
          return currentRevision > 0
        }

        function hasRedo() {
          return currentRevision + 1 < revisions.length
        }

        function clearRevisions() {
          revisions = []
          currentRevision = -1
        }

        module.exports = {
          createRevision: createRevision,
          clearRevisions: clearRevisions,
          undo: undo,
          redo: redo,
          hasUndo: hasUndo,
          hasRedo: hasRedo,
        }

        /***/
      }, // zoom.js
      /* 12 */ /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(1)

        var map = null

        function setNewMap(newMap) {
          map = newMap
        }

        function enableZoomOnCanvas(newMap) {
          map = newMap
          $('canvas').bind('wheel', function (event) {
            var point = new Point(event.clientX, event.clientY)
            zoom(-event.originalEvent.deltaY, point)

            function allowedZoom(zoom) {
              if (zoom !== paper.view.zoom) {
                paper.view.zoom = zoom
                return zoom
              }
              return null
            }

            function zoom(delta, point) {
              if (!delta) return

              var oldZoom = paper.view.zoom
              var oldCenter = paper.view.center
              var viewPos = paper.view.viewToProject(point)
              var newZoom = delta > 0 ? oldZoom * 1.05 : oldZoom / 1.05

              if (!allowedZoom(newZoom)) {
                return
              }

              var zoomScale = oldZoom / newZoom
              var centerAdjust = viewPos.subtract(oldCenter)
              var offset = viewPos.subtract(centerAdjust.multiply(zoomScale)).subtract(oldCenter)

              paper.view.center = view.center.add(offset)

              map.notifyAllStationsAndSegments()
            }
          })
        }

        module.exports = {
          enableZoomOnCanvas: enableZoomOnCanvas,
          setNewMap: setNewMap,
        }

        /***/
      }, // interaction.js
      /* 13 */ /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(1)
        var util = __webpack_require__(0)

        var map = null

        function setCurrentMap(currentMap) {
          map = currentMap
        }

        function showStationContextMenu(stationId) {
          $('#' + stationId).contextMenu()
        }

        function showStationInfo(station) {
          var $div = $('<div class="station-info">id:' + station.id + '</div>')
          $div.css('top', $('#' + station.id).css('top'))
          $div.css('left', $('#' + station.id).css('left'))
          $('#overlay-content').append($div)
        }

        function hideStationInfoAll() {
          $('.station-info').hide()
        }

        function showSegmentContextMenu(segmentId, position) {
          $('#segment-' + segmentId).data('position', position)
          $('#segment-' + segmentId).contextMenu()
        }

        function createStationMinorElement(station, track) {
          $('#overlay').append('<div class="station" id="' + station.id + '" data-station-id="' + station.id + '"></div>')
        }

        function createMapElements(map, onRemoveStation) {
          $('#overlay').empty()
          var mapElements = []
          for (var i in map.tracks) {
            var trackElements = createTrackElements(map.tracks[i], onRemoveStation)
            mapElements.push({
              track: map.tracks[i],
              stationElements: trackElements.stationElements,
              segmentElements: trackElements.segmentElements,
            })
          }
          return mapElements
        }

        function createTrackElements(track) {
          var stationElements = []
          for (var i in track.stations) {
            var stationElement = createStationElement(track.stations[i], track)
            stationElements.push(stationElement)
          }
          var segmentElements = createSegmentElements(track)
          return {
            stationElements: stationElements,
            segmentElements: segmentElements,
          }
        }

        function createStationElement(station, track) {
          $('#overlay').append('<div class="station" id="' + station.id + '" data-station-id="' + station.id + '"></div>')
          var stationElement = $('#' + station.id)

          updateElementPosition(stationElement, station)
          updateStyle()
          createStationObserver()

          function updateElementPosition(stationElement, station) {
            var viewPosition = paper.view.projectToView(station.position)
            stationElement.css('top', viewPosition.y - stationElement.width() / 2 + 'px')
            stationElement.css('left', viewPosition.x - stationElement.height() / 2 + 'px')
          }

          function updateStyle() {
            if (util.DisplaySettings.isDebug) {
              stationElement.css('border-width', '1px')
            } else {
              stationElement.css('border-width', '0px')
            }
          }

          function createStationObserver() {
            var stationObserver = new util.Observer(
              function (station) {
                updateElementPosition(this.stationElement, station)
              },
              function (station) {
                this.stationElement.remove()
              }
            )
            stationObserver.stationElement = stationElement
            station.registerObserver(stationObserver)
          }
          return stationElement
        }

        function createSegmentElements(track) {
          console.log('createSegmentElements')
          $('.segment').empty()
          var elements = []
          for (var i in track.segments) {
            var segment = track.segments[i]
            var element = createSegmentElement(segment, track)
            elements.push(element)
          }
          return elements
        }

        function createSegmentElement(segment, track) {
          var segmentElementId = 'segment-' + segment.id
          $('#overlay').append('<div class="segment" id="' + segmentElementId + '" data-segment-id="' + segment.id + '"></div>')
          var segmentElement = $('#' + segmentElementId)

          updateSegmentElementPosition(segmentElement, segment)
          updateStyle()
          createSegmentObserver()

          function updateSegmentElementPosition(segmentElement, segment) {
            var segmentCenterView = paper.view.projectToView(segment.center())
            segmentElement.css('top', segmentCenterView.y - segmentElement.width() / 2 + 'px')
            segmentElement.css('left', segmentCenterView.x - segmentElement.height() / 2 + 'px')
          }

          function updateStyle() {
            if (util.DisplaySettings.isDebug) {
              segmentElement.css('border-width', '1px')
            } else {
              segmentElement.css('border-width', '0px')
            }
          }

          function createSegmentObserver() {
            var segmentObserver = new util.Observer(
              function (segment) {
                updateSegmentElementPosition(this.segmentElement, segment)
              },
              function (segment) {
                this.segmentElement.remove()
              }
            )
            segmentObserver.segmentElement = segmentElement
            segment.registerObserver(segmentObserver)
          }

          return segmentElement
        }

        module.exports = {
          createMapElements: createMapElements,
          createTrackElements: createTrackElements,
          createStationElement: createStationElement,
          showStationInfo: showStationInfo,
          hideStationInfoAll: hideStationInfoAll,
          showStationContextMenu: showStationContextMenu,
          showSegmentContextMenu: showSegmentContextMenu,
          createSegmentElements: createSegmentElements,
          setCurrentMap: setCurrentMap,
        }

        /***/
      },
      /* 14 */
      /***/ function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(15)

        /***/
      }, // editor.js
      /* 15 */ /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(1)

        var MetroFlow = __webpack_require__(9)

        var sidebar = __webpack_require__(16)
        var toolbar = __webpack_require__(17)
        var contextmenu = __webpack_require__(18)

        $(initialise)

        // disable browser context menu
        $('body').on('contextmenu', '#paperCanvas', function (e) {
          return false
        })

        var map = null
        var currentTrack = null
        var segmentClicked = null
        var selectedStation = null
        var connectionStationA = null
        var connectionStationB = null
        var drawSettings = null
        var drawSettingsDrag = null
        var drawSettingsFull = null
        var dragging = false
        var doSnap = true
        var shareStationA = null
        var shareStationB = null

        function resetState() {
          map = null
          currentTrack = null
          segmentClicked = null
          selectedStation = null
          connectionStationA = null
          connectionStationB = null
          shareStationA = null
          shareStationB = null
          dragging = false
        }

        var modes = {
          majorstation: 'majorstation',
          minorstation: 'minorstation',
          select: 'select',
          createConnection: 'createConnection',
          movestation: 'movestation',
          selectline: 'selectline',
        }

        var mode = modes.select

        var hitOptions = {
          segments: true,
          stroke: true,
          fill: true,
          tolerance: 3,
        }

        function initialise() {
          drawSettings = MetroFlow.map.createDrawSettings()
          drawSettings.minorStationText = true
          drawSettingsDrag = MetroFlow.map.createDrawSettings()
          drawSettingsDrag.text = false
          drawSettingsDrag.fast = true
          drawSettingsFull = MetroFlow.map.createDrawSettings()
          drawSettingsFull.text = true
          drawSettingsFull.fast = false
          drawSettingsFull.calcTextPositions = true
          drawSettingsFull.minorStationText = true
          initialiseToolbarActions()
          var newMap = MetroFlow.map.createMap()
          setNewMap(newMap)
          setCurrentTrack(createTrack())
          $('#button-select').addClass('fa-border')
          //MetroFlow.zoom.enableZoomOnCanvas(map)
        }

        function setNewMap(newMap) {
          map = newMap
          MetroFlow.interaction.setCurrentMap(newMap)
          //MetroFlow.zoom.setNewMap(newMap)
        }

        function onRemoveStation(stationId) {
          selectedStation = null
          map.removeStation(stationId)
          map.draw(drawSettings)
          MetroFlow.revision.createRevision(map)
          for (var i in map.tracks) {
            sidebar.notifyTrackChanged(map.tracks[i])
          }
          currentTrack.notifyAllObservers()
        }

        function createTrack() {
          var track = map.createTrack()
          sidebar.notifyTrackChanged(track)
          return track
        }

        function setCurrentTrack(track) {
          if (!track || (currentTrack && currentTrack.id === track.id)) {
            return
          }
          if (selectedStation) {
            selectedStation.deselect()
          }
          currentTrack = track
          sidebar.setCurrentTrack(track)
        }

        function getStationClicked(hitResult, allowSwitchTrack) {
          var path = hitResult.item
          var result = map.findStationByPathId(path.id)
          var stationClicked = result.station
          // if (allowSwitchTrack) {
          //   setCurrentTrack(result.track)
          // }
          return stationClicked
        }

        function getSegmentClicked(hitResult) {
          var path = hitResult.item
          var segments = path.segments
          if (!segments) {
            return null
          }
          var result = map.findSegmentByPathId(segments[0].path.id)
          var segmentClicked = result.segment
          setCurrentTrack(result.track)
          return segmentClicked
        }

        function onRightClick(event) {
          var hitResult = project.hitTest(event.point, hitOptions)
          if (!hitResult) {
            return
          }

          var stationClicked = getStationClicked(hitResult)
          if (stationClicked) {
            // right mouse
            MetroFlow.interaction.showStationContextMenu(stationClicked.id)
            // MetroFlow.interaction.hideStationInfoAll();
            // MetroFlow.interaction.showStationInfo(stationClicked);
            return
          }
          var segmentClicked = getSegmentClicked(hitResult)
          if (segmentClicked) {
            // right mouse
            MetroFlow.interaction.showSegmentContextMenu(segmentClicked.id)
            return
          }
        }

        function selectStation(stationClicked) {
          console.log('stationClicked: ' + stationClicked.name)
          if (selectedStation && stationClicked.id !== selectedStation.id) {
            selectedStation.deselect()
          }
          stationClicked.toggleSelect()
          console.log(stationClicked)
          if (stationClicked.isSelected) {
            selectedStation = stationClicked
            $('#selected-station').html(selectedStation.name)
          } else {
            selectedStation = null
            $('#selected-station').html('none')
          }

          map.draw(drawSettings)
        }

        function onClickMajorStationMode(event) {
          console.log('segmentClicked: ' + segmentClicked)
          if (segmentClicked) {
            console.log('major station - segment clicked')
            segmentClicked.deselect()
            segmentClicked = null
            map.draw(drawSettings)
          }
          var hitResult = project.hitTest(event.point, hitOptions)
          // click on existing station or segment
          if (hitResult) {
            var stationClicked = getStationClicked(hitResult, false)
            if (stationClicked && selectedStation) {
              // click on existing station to create a segment between two stations
              console.log('station clicked')
              if (stationClicked.id !== selectedStation.id && !stationClicked.offsetFactor && !selectedStation.offsetFactor) {
                currentTrack.createSegment(stationClicked, selectedStation)
                currentTrack.stations.push(stationClicked)
                selectStation(stationClicked)
                currentTrack.stationsMajor.push(stationClicked)
                console.log('connect station', stationClicked.id)
                console.log(currentTrack.stationsMajor)
                currentTrack.notifyAllObservers()
                sidebar.notifyTrackChanged(currentTrack)
              }
              map.draw(drawSettings)
              MetroFlow.revision.createRevision(map)
              return
            }
            // click on existing segment to create a new minor station
            var currentSegment = getSegmentClicked(hitResult)
            if (currentSegment) {
              var offsetFactor = currentSegment.getOffsetOf(event.point) / currentSegment.length()
              var stationNew = currentTrack.createStationOnSegment(currentSegment, offsetFactor)
              map.draw(drawSettings)
              MetroFlow.revision.createRevision(map)
              // TODO: create elements based on track/map observer in interaction
              var stationElement = MetroFlow.interaction.createStationElement(stationNew, currentTrack, onRemoveStation)
              contextmenu.createStationContextMenu(stationElement.attr('id'), onRemoveStation)
              return
            }
          } else {
            // click on empty space to create a new station
            console.log('selectedStation: ' + selectedStation)
            if (selectedStation) {
              if (!currentTrack.findStation(selectedStation.id)) {
                alert("Currently selected station is not on the current track, you can't create a new station connecting from this station. Please select the proper track first.")
                return
              }
            }
            if (!selectedStation) {
              selectedStation = currentTrack.lastAddedStation()
            }
            var stationNew = currentTrack.createStationFree(event.point, selectedStation)
            if (doSnap) {
              var position = MetroFlow.snap.snapPosition(currentTrack, stationNew, event.point)
              stationNew.setPosition(position)
            }
            // if (selectedStation) {
            //   selectedStation.toggelSelect()
            // }
            console.log('selectedStation: ' + selectedStation)
            selectStation(stationNew)
            // TODO: create elements based on track/map observer in interaction
            var stationElement = MetroFlow.interaction.createStationElement(stationNew, currentTrack, onRemoveStation)
            contextmenu.createStationContextMenu(stationElement.attr('id'), onRemoveStation)
            var segmentElements = MetroFlow.interaction.createSegmentElements(currentTrack)
            for (var i in segmentElements) {
              var element = segmentElements[i]
              contextmenu.createSegmentContextMenu(element.attr('id'), createStationMinorOnMap)
            }
            sidebar.notifyTrackChanged(currentTrack)
            MetroFlow.revision.createRevision(map)
            return
          }
        }

        function createStationMinorOnMap(position, segmentId) {
          var segmentInfo = map.findSegment(segmentId)
          segmentInfo.track.createStationMinorOnSegmentId(position, segmentId)
          map.draw(drawSettings)
          MetroFlow.revision.createRevision(map)
        }

        function onClickMinorStationMode(event) {
          console.log('onClickMinorStationMode')
          var hitResult = project.hitTest(event.point, hitOptions)
          if (hitResult) {
            var path = hitResult.item
            if (hitResult.type === 'stroke' || path) {
              console.log('stroke hit')
              segmentClicked = getSegmentClicked(hitResult)
              if (segmentClicked) {
                createStationMinorOnMap(event.point, segmentClicked.id)
              } else {
                console.log('warning: no segment clicked')
              }
            }
          }
        }

        function onClickSelectMode(event) {
          var hitResult = project.hitTest(event.point, hitOptions)
          if (hitResult) {
            // select the station and deselect the segment
            var stationClicked = getStationClicked(hitResult, true)
            if (stationClicked) {
              console.log('selectedStation', selectedStation)
              // deselect segment
              if (segmentClicked) {
                segmentClicked.deselect()
                segmentClicked = null
              }
              selectStation(stationClicked)
              return
            }

            // select the segment and deselect the station
            var newSegmentClicked = getSegmentClicked(hitResult)
            if (!newSegmentClicked) return
            if (segmentClicked && segmentClicked.id != newSegmentClicked.id) {
              segmentClicked.deselect()
            }
            segmentClicked = newSegmentClicked
            // deselect station
            if (selectedStation) {
              selectedStation.deselect()
              selectedStation = null
            }
            console.log('segment clicked')
            console.log(segmentClicked)
            segmentClicked.toggleSelect()
            map.draw(drawSettings)
            return
          }
        }

        function onClickSelectLineMode(event) {
          if (selectedStation) {
            selectedStation.deselect()
            selectedStation = null
          }

          var hitResult = project.hitTest(event.point, hitOptions)
          if (hitResult) {
            var newSegmentClicked = getSegmentClicked(hitResult)
            if (!newSegmentClicked) return
            if (segmentClicked && segmentClicked.id != newSegmentClicked.id) {
              segmentClicked.deselect()
            }
            segmentClicked = newSegmentClicked
            console.log('segment clicked')
            console.log(segmentClicked)
            segmentClicked.toggleSelect()
            map.draw(drawSettings)
            return
          }
        }

        function onClickCreateConnectionMode(event) {
          console.log('onClickCreateConnectionMode')
          var hitResult = project.hitTest(event.point, hitOptions)
          if (!hitResult) {
            return
          }
          var stationClicked = getStationClicked(hitResult, false)
          if (!stationClicked) {
            return
          }

          if (!connectionStationA) {
            connectionStationA = stationClicked
            connectionStationA.select()
            map.draw(drawSettings)
          } else {
            connectionStationB = stationClicked
            if (connectionStationA.id === connectionStationB.id) {
              connectionStationB = null
              return
            }
            console.log('create new connection', connectionStationA.id, connectionStationB.id)
            map.createConnection(connectionStationA, connectionStationB)
            connectionStationA.deselect()
            map.draw(drawSettings)
            MetroFlow.revision.createRevision(map)
            connectionStationA = null
            connectionStationB = null
          }
        }

        var startPosition = null

        function onMouseDown(event) {
          startPosition = event.point
          if (event.event.which === 3) {
            // right mouse
            onRightClick(event)
            return
          }

          if (mode === modes.majorstation) {
            onClickMajorStationMode(event)
          } else if (mode === modes.minorstation) {
            selectedStation = null
            onClickMinorStationMode(event)
          } else if (mode === modes.select) {
            onClickSelectMode(event)
          } else if (mode == modes.movestation) {
            //onClickMoveStationMode(event)
          } else if (mode === modes.createConnection) {
            onClickCreateConnectionMode(event)
          } else if (mode == modes.selectline) {
            onClickSelectLineMode(event)
          }
        }

        function onMouseUp(event) {
          if (dragging) {
            map.draw(drawSettings)
            MetroFlow.revision.createRevision(map)
            dragging = false
          }
        }

        function onMouseDrag(event) {
          dragging = true
          //console.log('onMouseDrag')
          //    if (mode == modes.select) {
          //        console.log('panning', event.delta);
          //        var offset = startPosition - event.point;
          //        paper.view.center = view.center.add(offset);
          //        return;
          //    }
          console.log(selectedStation)
          if (selectedStation && mode !== modes.majorstation) {
            // if (mode == modes.movestation && selectedStation) {
            var position = event.point
            if (doSnap && selectedStation.doSnap) {
              position = MetroFlow.snap.snapPosition(currentTrack, selectedStation, event.point)
            }
            var segments = currentTrack.findSegmentsForStation(selectedStation)
            console.assert(segments[0])
            selectedStation.setPosition(position, segments[0])
            selectedStation.select()
            map.draw(drawSettingsDrag)
          }
        }

        function initialiseToolbarActions() {
          console.log('initialiseToolbarActions')

          toolbar.setMajorStationButtonAction(majorStationButtonClicked)
          toolbar.setMinorStationButtonAction(minorStationButtonClicked)
          toolbar.setSelectButtonAction(selectButtonClicked)
          toolbar.setNewTrackButtonAction(newTrackButtonClicked)
          toolbar.setNewConnectionAction(newConnectionButtionClicked)
          toolbar.setMoveStationButtonAction(moveStationButtonClicked)
          toolbar.setSelectLineButtonAction(selectLineButtonClicked)
          toolbar.setCalcTextPositionsAction(calcTextPositionButtonClicked)
          toolbar.setToggleSnapAction(snapCheckboxClicked)
          toolbar.setUndoAction(onUndoButtonClicked)
          toolbar.setRedoAction(onRedoButtonClicked)
          toolbar.setSaveMapAction(saveMapClicked)
          toolbar.setExportD3Action(exportToD3Clicked)
          toolbar.setLoadMapAction(loadMapClicked)

          sidebar.setToggleMinorNamesAction(minorNamesCheckboxClicked)
          sidebar.setToggleDebugAction(debugCheckboxClicked)
          sidebar.setExampleMapAction(loadExampleMapClicked)
          sidebar.setLatestMapAction(loadLatestMapClicked)
          sidebar.setTrackColorChangeAction(onTrackColorChanged)
          sidebar.setTrackWidthSliderChangeAction(onTrackWidthChanged)
          sidebar.setStationRadiusSliderChangeAction(onStationRadiusChanged)
          sidebar.setStationStrokeWidthSliderChangeAction(onStationStrokeWidthChanged)
          sidebar.setStationStrokeColorChangeAction(onStationStrokeColorChanged)
          sidebar.setTrackChangeAction(onTrackChanged)
          sidebar.setTrackOtherChangeAction(onTrackOtherChanged)

          function onTrackChanged(track) {
            MetroFlow.revision.createRevision(map)
            map.draw(drawSettings)
          }

          function onTrackOtherChanged(id) {
            console.log('track.removeStation() on track:', currentTrack.id)
            var stationsOnSegment = []
            var newStation = []
            var segmentRemoved = []
            var segmentForMinor
            for (var i = currentTrack.segments.length - 1; i >= 0; i--) {
              // loop backwards because we splice the array
              var segment = currentTrack.segments[i]
              if (segment.stationA.id === id || segment.stationB.id === id) {
                var stationsRemoved = segment.getAllOnSegmentStations()
                stationsOnSegment = stationsOnSegment.concat(stationsRemoved)
                if (segment.stationA.id === id) {
                  var pos = currentTrack.segments.indexOf(segment)
                  if (pos > -1) {
                    newStation.push(segment.stationB)
                    segmentRemoved.push(segment)
                  }
                } else if (segment.stationB.id === id) {
                  var pos = currentTrack.segments.indexOf(segment)
                  if (pos > -1) {
                    newStation.push(segment.stationA)
                    segmentRemoved.push(segment)
                  }
                }
                if (newStation.length > 2) {
                  alert("the station connects to more than 2 major stations in this track. It can't be deleted.")
                  console.log("the station connects to more than 2 major stations in this track. It can't be deleted.")
                  return
                }
              } else {
                // the minor station to be removed
                segmentForMinor = segment
              }
            }

            // If the deleted station is a major station and connected to only two major stations in a track
            if (newStation && newStation.length == 2) {
              // Remove two segments
              for (var i in segmentRemoved) {
                var pos = currentTrack.segments.indexOf(segmentRemoved[i])
                currentTrack.segments.splice(pos, 1)
              }
              // Remove minor stations on segments
              for (var j in stationsOnSegment) {
                removeFromTrackState(currentTrack, stationsOnSegment[j].id)
              }

              // create new segment between newStationA and newStationB
              var newSegment = currentTrack.createSegment(newStation[0], newStation[1])
              // add back minor stations on the new segment
              for (var i = 0; i < stationsOnSegment.length; i++) {
                var offsetFactor = (i + 1) / (stationsOnSegment.length + 1)
                var stationNew = currentTrack.createStationOnSegment(newSegment, offsetFactor)
                stationNew.id = stationsOnSegment[i].id
                stationNew.name = stationsOnSegment[i].name
                //map.draw(drawSettings)

                // TODO: create elements based on track/map observer in interaction
                var stationElement = MetroFlow.interaction.createStationElement(stationNew, currentTrack, onRemoveStation)
                contextmenu.createStationContextMenu(stationElement.attr('id'), onRemoveStation)
              }

              removeFromTrackState(currentTrack, id)
              map.draw(drawSettings)
              MetroFlow.revision.createRevision(map)
              currentTrack.notifyAllObservers()
              sidebar.notifyTrackChanged(currentTrack)
            } else if (newStation && newStation.length == 1) {
              alert("the station is the first or last major station in this track. It can't be deleted.")
              console.log("the station is the first or last major station in this track. It can't be deleted.")
            } else {
              if (segmentForMinor) {
                segmentForMinor.removeStation(id)
                removeFromTrackState(currentTrack, id)
                map.draw(drawSettings)
                MetroFlow.revision.createRevision(map)
                currentTrack.notifyAllObservers()
                sidebar.notifyTrackChanged(currentTrack)
              }
            }
          }

          function removeFromTrackState(track, id) {
            var station = track.findStation(id)
            if (station) {
              console.log('track.removeStation()', station)
              var pos = track.stations.indexOf(station)
              if (pos > -1) {
                station.notifyBeforeRemove()
                track.stations.splice(pos, 1)
              }
              pos = track.stationsMajor.indexOf(station)
              if (pos > -1) {
                station.notifyBeforeRemove()
                track.stationsMajor.splice(pos, 1)
              }
              pos = track.stationsMinor.indexOf(station)
              if (pos > -1) {
                station.notifyBeforeRemove()
                track.stationsMinor.splice(pos, 1)
              }
            }
          }

          function majorStationButtonClicked() {
            console.log('major station drawing selected')
            $('.fa-lg').removeClass('fa-border')
            $('#toolbar .fa-circle').addClass('fa-border')
            mode = modes.majorstation
          }

          function minorStationButtonClicked() {
            console.log('minor station drawing selected')
            $('.fa-lg').removeClass('fa-border')
            $('#toolbar .fa-sliders-h').addClass('fa-border')
            mode = modes.minorstation
          }

          function selectButtonClicked() {
            console.log('selection station mode selected')
            $('.fa-lg').removeClass('fa-border')
            $('#toolbar .fa-mouse-pointer').addClass('fa-border')
            mode = modes.select
          }

          function selectLineButtonClicked() {
            console.log('selection line mode selected')
            $('.fa-lg').removeClass('fa-border')
            $('#toolbar .fa-minus').addClass('fa-border')
            mode = modes.selectline
          }

          function newTrackButtonClicked() {
            console.log('new track button clicked')
            if (selectedStation) {
              selectedStation.deselect()
            }
            selectedStation = null
            var newTrack = createTrack()
            var segmentStyle = styles.createSegmentStyle()
            console.log(map)
            segmentStyle.strokeColor = styles.pickTrackStrokeColor(map.tracks.length - 1)
            //segmentStyle.strokeColor = styles.rgbToHex(0, 0, 255)
            newTrack.segmentStyle = segmentStyle
            MetroFlow.revision.createRevision(map)
            setCurrentTrack(newTrack)
          }

          function newConnectionButtionClicked() {
            console.log('new connection button clicked')
            $('.fa-lg').removeClass('fa-border')
            $('#toolbar .fa-link').addClass('fa-border')
            connectionStationA = null
            connectionStationB = null
            mode = modes.createConnection
          }

          function moveStationButtonClicked() {
            console.log('move station button clicked')
            $('.fa-lg').removeClass('fa-border')
            $('#toolbar .fa-hand-paper').addClass('fa-border')
            mode = modes.movestation
          }

          function calcTextPositionButtonClicked() {
            console.log('calc text position button clicked')
            map.draw(drawSettingsFull)
          }

          function snapCheckboxClicked(event) {
            console.log('snap clicked', event.target.checked)
            doSnap = event.target.checked
            map.draw(drawSettingsFull)
          }

          function minorNamesCheckboxClicked(event) {
            console.log('minor names clicked', event.target.checked)
            drawSettings.minorStationText = event.target.checked
            drawSettingsFull.minorStationText = event.target.checked
            map.draw(drawSettingsFull)
          }

          function debugCheckboxClicked(event) {
            console.log('debug clicked', event.target.checked)
            MetroFlow.util.DisplaySettings.isDebug = event.target.checked
            map.draw(drawSettings)
            if (MetroFlow.util.DisplaySettings.isDebug) {
              $('.station').css('border-width', '1px')
              $('.segment').css('border-width', '1px')
            } else {
              $('.station').css('border-width', '0px')
              $('.segment').css('border-width', '0px')
            }
            map.draw(drawSettingsFull)
          }

          function saveMapClicked() {
            console.log('save map button clicked')
            var mapJSONString = MetroFlow.serialize.saveMap(map, true)
            var data = 'text/json;charset=utf-8,' + encodeURIComponent(mapJSONString)
            var a = document.createElement('a')
            a.href = 'data:' + data
            a.download = 'data.json'
            a.innerHTML = 'download JSON'
            a.click()
          }

          function exportToD3Clicked() {
            console.log('save d3 map button clicked')
            var paperMapJSON = MetroFlow.serialize.saveMap(map, false)
            var d3MapJSON = MetroFlow.serialize.saveMapD3(map, false)

            if (!d3MapJSON) {
              alert('Map is not compliant with designing rules.')
              return
            }

            $.post({
              url: 'http://localhost:1337/chart/map',
              data: {
                paperJson: JSON.stringify(paperMapJSON),
                d3Json: JSON.stringify(d3MapJSON),
              },
              xhrFields: {
                withCredentials: true,
              },
              crossDomain: true,
              success: function (d) {
                console.log(d)
                var data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(d))
                var a = document.createElement('a')
                a.href = 'data:' + data
                a.download = 'd3-data.json'
                a.innerHTML = 'download JSON'
                a.click()
              },
              error: function (xhr, textStatus, error) {
                if (xhr.status === 403) {
                  alert('Only Administrator can export json to Mapplication. Please use "save map" to download json to local.')
                } else {
                  if (xhr.responseText) {
                    alert(xhr.responseText)
                  } else {
                    alert(error)
                  }
                }
              },
            })
          }

          function loadMapClicked(event) {
            console.log('load map button clicked')
            prepareLoadMap()

            readSingleFile(event)

            function readSingleFile(event) {
              var file = event.target.files[0]
              console.log(file)
              if (!file) {
                return
              }
              var reader = new FileReader()
              reader.onload = function (event) {
                var contents = event.target.result
                displayContents(contents)
              }
              reader.readAsText(file)
            }

            function displayContents(contents) {
              loadMapJson(JSON.parse(contents))
            }
          }

          function prepareLoadMap() {
            console.log('create revision before clear')
            MetroFlow.revision.createRevision(map)
            project.clear()
            resetState()
          }

          function finishLoadMap(newMap) {
            newMap.draw(drawSettingsFull)
            MetroFlow.revision.createRevision(newMap)
            var mapElements = MetroFlow.interaction.createMapElements(newMap, onRemoveStation)
            createContextMenusMapElements(mapElements)
            console.log('finishLoadMap')
          }

          function createContextMenusMapElements(mapElements) {
            for (var i in mapElements) {
              var track = mapElements[i].track
              var stationElements = mapElements[i].stationElements
              var segmentElements = mapElements[i].segmentElements
              for (var j in segmentElements) {
                contextmenu.createSegmentContextMenu(segmentElements[j].attr('id'), track)
              }
              for (var j in stationElements) {
                contextmenu.createStationContextMenu(stationElements[j].attr('id'), onRemoveStation)
              }
            }
          }

          function loadMapJson(json) {
            var newMap = MetroFlow.serialize.loadMap(json)
            setNewMap(newMap)
            if (newMap.tracks.length > 0) {
              setCurrentTrack(newMap.tracks[0])
            }
            finishLoadMap(newMap)
            for (var i in newMap.tracks) {
              sidebar.notifyTrackChanged(newMap.tracks[i])
            }
            newMap.tracks[0].notifyAllObservers()
          }

          function loadMapFile(filepath) {
            console.log('loadMapFile')
            $.getJSON(filepath, function (json) {
              loadMapJson(json)
            })
          }

          function loadExampleMapClicked(filename) {
            prepareLoadMap()
            loadMapFile('maps/' + filename)
          }

          function loadLatestMapClicked() {
            console.log('clicked')
            prepareLoadMap()
            $.ajax({
              url: 'http://localhost:1337/chart/map',
              xhrFields: {
                withCredentials: true,
              },
              crossDomain: true,
              success: function (d) {
                console.log('success')
                console.log(d)
                loadMapJson(d[0].paperJson)
              },
            }).fail(function () {
              alert('Only Administrator can export json to Mapplication. Please use "save map" to download json to local.')
            })
          }

          function prepareUndoRedo() {
            var currentTrackId = null
            if (currentTrack) {
              currentTrackId = currentTrack.id
            }
            project.clear()
            resetState()
            return currentTrackId
          }

          function finaliseUndoRedo(currentTrackId) {
            var track = null
            if (currentTrackId) {
              track = map.findTrack(currentTrackId)
            }
            if (!track && map.tracks) {
              track = map.tracks[map.tracks.length - 1]
            } else if (!map.tracks) {
              track = createTrack()
            }
            setCurrentTrack(track)
            map.draw(drawSettingsFull)
            MetroFlow.interaction.createMapElements(map, onRemoveStation)
            for (var i in map.tracks) {
              sidebar.notifyTrackChanged(map.tracks[i])
            }
            track.notifyAllObservers()
          }

          function onUndoButtonClicked() {
            if (!MetroFlow.revision.hasUndo()) {
              console.log('NO UNDO AVAILABLE')
              return
            }
            var currentTrackId = prepareUndoRedo()
            setNewMap(MetroFlow.revision.undo(map))
            finaliseUndoRedo(currentTrackId)
          }

          function onRedoButtonClicked() {
            if (!MetroFlow.revision.hasRedo()) {
              console.log('NO REDO AVAILABLE')
              return
            }
            var currentTrackId = prepareUndoRedo()
            setNewMap(MetroFlow.revision.redo(map))
            finaliseUndoRedo(currentTrackId)
          }

          function onTrackColorChanged(color) {
            console.log('onTrackColorChanged')
            var segmentStyle = currentTrack.segmentStyle
            segmentStyle.strokeColor = color
            currentTrack.setSegmentStyle(segmentStyle)
            map.draw(drawSettings)
            MetroFlow.revision.createRevision(map)
            currentTrack.notifyAllObservers()
          }

          function onTrackWidthChanged(value) {
            var segmentStyle = currentTrack.segmentStyle
            segmentStyle.strokeWidth = value
            currentTrack.setSegmentStyle(segmentStyle)
            map.draw(drawSettings)
            MetroFlow.revision.createRevision(map)
            currentTrack.notifyAllObservers()
          }

          function onStationRadiusChanged(radius) {
            console.log('onStationRadiusChanged', radius)
            currentTrack.stationStyle.stationRadius = radius
            map.draw(drawSettings)
            MetroFlow.revision.createRevision(map)
            currentTrack.notifyAllObservers()
          }

          function onStationStrokeWidthChanged(strokeWidth) {
            currentTrack.stationStyle.strokeWidth = strokeWidth
            map.draw(drawSettings)
            MetroFlow.revision.createRevision(map)
            currentTrack.notifyAllObservers()
          }

          function onStationStrokeColorChanged(color) {
            currentTrack.stationStyle.strokeColor = color
            map.draw(drawSettings)
            MetroFlow.revision.createRevision(map)
            currentTrack.notifyAllObservers()
          }
        }

        tool.onMouseDown = onMouseDown
        tool.onMouseUp = onMouseUp
        tool.onMouseDrag = onMouseDrag
        tool.onKeyDown = onKeyDown

        /***/
      }, // sidebar.js
      /* 16 */ /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(1)
        __webpack_require__(9)

        var currentTrack = null

        function setCurrentTrack(track) {
          if (currentTrack && currentTrack.id === track.id) {
            return
          }
          var colorPicker = document.getElementById('track-color-picker')
          colorPicker.value = track.segmentStyle.strokeColor
          document.getElementById('station-stroke-color-picker').value = track.stationStyle.strokeColor

          $('#track-width-slider').slider('value', track.segmentStyle.strokeWidth)
          $('#station-radius-slider').slider('value', track.stationStyle.stationRadius)
          $('#station-stroke-width-slider').slider('value', track.stationStyle.strokeWidth)

          currentTrack = track
          //$('#selected-track').html(currentTrack.id)

          console.log(currentTrack.id)
          $('.badge.bg-secondary').attr('style', 'background-color: ' + currentTrack.segmentStyle.strokeColor + '!important')
          $('#track-name').val(currentTrack.id)
          $('#track-name').data('trackid', currentTrack.id)
          $('#track-name-change').bind('click', trackNameInputChange)

          updateTableTrack(track)

          function trackNameInputChange() {
            currentTrack.id = $('#track-name').val()
            console.log('track: ' + currentTrack.id)
            signalTrackInfoChanged(currentTrack)
          }
        }

        function setExampleMapAction(callback) {
          $('#button-example-map1').bind('click', loadFilename)

          function loadFilename() {
            var filename = $(this).data('filename')
            console.log(filename)
            callback(filename)
          }
        }

        function setLatestMapAction(callback) {
          $('#button-latest-map').bind('click', callback)
        }

        function setTrackColorChangeAction(callback) {
          var colorPicker = document.getElementById('track-color-picker')
          colorPicker.addEventListener('input', watchColorPicker, false)
          colorPicker.addEventListener('change', watchColorPicker, false)

          function watchColorPicker(event) {
            var color = event.target.value
            callback(color)
          }
        }

        function setTrackWidthSliderChangeAction(callback) {
          $('#track-width-slider').slider({
            slide: watchSlider,
            change: watchSlider,
            min: 0,
            max: 20,
            step: 0.5,
          })

          function watchSlider(event, ui) {
            console.log(ui.value)
            callback(ui.value)
          }
        }

        function setStationRadiusSliderChangeAction(callback) {
          $('#station-radius-slider').slider({
            slide: watchSlider,
            change: watchSlider,
            min: 0,
            max: 20,
            step: 0.5,
          })

          function watchSlider(event, ui) {
            callback(ui.value)
          }
        }

        function setStationStrokeWidthSliderChangeAction(callback) {
          $('#station-stroke-width-slider').slider({
            slide: watchSlider,
            change: watchSlider,
            min: 0,
            max: 20,
            step: 0.5,
          })

          function watchSlider(event, ui) {
            callback(ui.value)
          }
        }

        function setStationStrokeColorChangeAction(callback) {
          var colorPicker = document.getElementById('station-stroke-color-picker')
          colorPicker.addEventListener('input', watchColorPicker, false)
          colorPicker.addEventListener('change', watchColorPicker, false)

          function watchColorPicker(event) {
            var color = event.target.value
            callback(color)
          }
        }

        function showTracks(tracks) {
          var sideBar = $('#sidebar')
        }

        function updateTableTrack(track) {
          console.log('TrackObserver.trackChanged()')
          if (!currentTrack || currentTrack.id !== track.id) {
            return
          }

          $('#track-table tbody').empty()
          for (var i in track.stations) {
            var station = track.stations[i]
            addStationRow(station)
          }

          function addStationRow(station) {
            var markup = "<tr><td><input class='form-control form-control-sm' id='station-row-" + station.id + "' type='text' name='station' value='" + station.name + "' data-stationid='" + station.id + "'><button button id = 'button-remove-station-" + station.id + "' type='button' class='btn btn-outline-primary btn-sm' name='station' value='" + station.name + "' data-stationid='" + station.id + "' > remove</button ></td ></tr>"
            $('#track-table tbody').append(markup)
            $('#station-row-' + station.id).bind('change', stationNameInputChange)
            $('#button-remove-station-' + station.id).bind('click', stationNameRemove)
          }

          function stationNameInputChange() {
            console.log('stationNameInputChange')
            var stationId = $(this).data('stationid')
            console.log('stationid', stationId)
            var station = track.findStation(stationId)
            console.log('station', station)
            console.log('value', $(this).val())
            station.name = $(this).val()
            signalTrackInfoChanged(track)
          }

          function stationNameRemove() {
            console.log('stationNameRemove')
            var stationId = $(this).data('stationid')
            console.log('stationid', stationId)
            var station = currentTrack.findStation(stationId)
            console.log('station', station)
            console.log('value', $(this).val())
            station.name = $(this).val()
            signalTrackOtherChanged(stationId)
          }
        }

        function notifyTrackChanged(track) {
          console.log('notify tracks changed')
          var trackObserver = new util.Observer(updateTableTrack, function (track) {
            return
          })
          track.registerObserver(trackObserver)
        }

        var signalTrackInfoChanged = null
        var signalTrackOtherChanged = null

        function setTrackChangeAction(callback) {
          signalTrackInfoChanged = callback
        }

        function setTrackOtherChangeAction(callback) {
          signalTrackOtherChanged = callback
        }

        function setToggleDebugAction(callback) {
          $('#checkbox-debug').bind('click', callback)
        }

        function setToggleMinorNamesAction(callback) {
          $('#checkbox-minor-station-names').bind('click', callback)
        }

        module.exports = {
          notifyTrackChanged: notifyTrackChanged,
          setExampleMapAction: setExampleMapAction,
          setLatestMapAction: setLatestMapAction,
          setCurrentTrack: setCurrentTrack,
          setTrackColorChangeAction: setTrackColorChangeAction,
          setTrackWidthSliderChangeAction: setTrackWidthSliderChangeAction,
          setStationRadiusSliderChangeAction: setStationRadiusSliderChangeAction,
          setStationStrokeWidthSliderChangeAction: setStationStrokeWidthSliderChangeAction,
          setStationStrokeColorChangeAction: setStationStrokeColorChangeAction,
          setTrackChangeAction: setTrackChangeAction,
          setTrackOtherChangeAction: setTrackOtherChangeAction,
          setToggleDebugAction: setToggleDebugAction,
          setToggleMinorNamesAction: setToggleMinorNamesAction,
        }

        /***/
      }, // toolbar.js
      /* 17 */ /***/ function (module, exports) {
        $(function () {
          var buttonMajorStation = $('#button-major-station')
          var buttonMinorStation = $('#button-minor-station')
          var buttonSelect = $('#button-select')

          buttonMajorStation.bind('click', function () {
            console.log('major button')
          })

          buttonMinorStation.bind('click', function () {
            console.log('minor button')
          })
        })

        function setMajorStationButtonAction(callback) {
          var buttonMajorStation = $('#button-major-station')
          buttonMajorStation.bind('click', callback)
        }

        function setMinorStationButtonAction(callback) {
          var buttonMinorStation = $('#button-minor-station')
          buttonMinorStation.bind('click', callback)
        }

        function setSelectButtonAction(callback) {
          var buttonSelect = $('#button-select')
          buttonSelect.bind('click', callback)
        }

        function setSelectLineButtonAction(callback) {
          var buttonLineSelect = $('#button-line-select')
          buttonLineSelect.bind('click', callback)
        }

        function setNewTrackButtonAction(callback) {
          var buttonNewTrack = $('#button-new-track')
          buttonNewTrack.bind('click', callback)
        }

        function setNewConnectionAction(callback) {
          var buttonNewConnection = $('#button-new-connection')
          buttonNewConnection.bind('click', callback)
        }

        function setMoveStationButtonAction(callback) {
          var buttonMoveStation = $('#button-move-station')
          buttonMoveStation.bind('click', callback)
        }

        function setUndoAction(callback) {
          $('#button-undo').bind('click', callback)
        }

        function setRedoAction(callback) {
          $('#button-redo').bind('click', callback)
        }

        function setCalcTextPositionsAction(callback) {
          $('#button-calc-text-positions').bind('click', callback)
        }

        function setToggleSnapAction(callback) {
          $('#checkbox-snap').bind('click', callback)
        }

        function setSaveMapAction(callback) {
          var button = $('#button-save-map')
          button.bind('click', callback)
        }

        function setExportD3Action(callback) {
          var button = $('#button-export-d3')
          button.bind('click', callback)
        }

        function setLoadMapAction(callback) {
          document.getElementById('file-input').addEventListener('change', callback, false)
        }

        module.exports = {
          setMajorStationButtonAction: setMajorStationButtonAction,
          setMinorStationButtonAction: setMinorStationButtonAction,
          setSelectButtonAction: setSelectButtonAction,
          setNewTrackButtonAction: setNewTrackButtonAction,
          setNewConnectionAction: setNewConnectionAction,
          setSelectLineButtonAction: setSelectLineButtonAction,
          setMoveStationButtonAction: setMoveStationButtonAction,
          setUndoAction: setUndoAction,
          setRedoAction: setRedoAction,
          setToggleSnapAction: setToggleSnapAction,
          setCalcTextPositionsAction: setCalcTextPositionsAction,
          setSaveMapAction: setSaveMapAction,
          setExportD3Action: setExportD3Action,
          setLoadMapAction: setLoadMapAction,
        }

        /***/
      }, // contextmenu.js
      /* 18 */ /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(9)

        function createStationContextMenu(stationElementId, onRemoveStation) {
          console.assert(stationElementId)
          $.contextMenu({
            selector: '#' + stationElementId,
            trigger: 'none',
            callback: function (key, options) {
              if (key === 'delete') {
                console.log('delete')
                var stationId = $(options.selector).data('station-id')
                onRemoveStation(stationId)
              }
            },
            items: {
              delete: { name: 'Delete', icon: 'delete' },
            },
          })
        }

        function createSegmentContextMenu(segmentElementId, onCreateStationMinor) {
          $.contextMenu({
            selector: '#' + segmentElementId,
            trigger: 'none',
            callback: function (key, options) {
              var segmentId = $(options.selector).data('segment-id')
              if (key === 'createMinorStation') {
                var position = $(options.selector).data('position')
                onCreateStationMinor(position, segmentId)
              }
            },
            items: {
              createMinorStation: { name: 'Add minor station', icon: 'add' },
            },
          })
        }

        module.exports = {
          createStationContextMenu: createStationContextMenu,
          createSegmentContextMenu: createSegmentContextMenu,
        }

        /***/
      },
      /******/
    ]
  )
})
