(function(global) {
    
    var EPUBcfi = {};

    // Description: This object contains members used to configure the behaviour of the epub cfi library.
// REFACTORING CANDIDATE: I'm still not sure how this configuration information should be set and managed.
//   Presently, the object is declared as a literal and users will simply change parameters. Thinking, thinking..

EPUBcfi.Config = {

    // Description: This method retrieves and returns a resource, based on a URL, and returns a document object.
    // Arguments: the resource URL
    // Rationale: The intention here is that this method is overriden to use a retrieval mechanism that makes sense 
    //   for the reading system that the cfi library is being used in. 
    // REFACTORING CANDIDATE: This will be refactored to be an asynchronous call, although this will require changes 
    //   throughout the intepreter.
    retrieveResource : function (resourceURL) {

        var resource;

        $.ajax({

            type: "GET",
            url: resourceURL,
            dataType: "xml",
            async: false,
            success: function (response) {

                resource = response;
            }
        });

        return resource;
    },

    // Description: A hash of default html elements to inject, for each type of cfi terminus
    // Rationale: The intention is that a user can specify the default element to inject for each type of cfi terminus. 
    cfiMarkerElements : {

        textPointMarker : '<span class="cfi_marker"></span>'
    },

    // Description: The URL to the epub's package document. The interpreter requires this to be able to load other resources in the
    //   epub, as all URIs in epub documents are specified relative to the package document. 
    // Rationale: This is currently set as part fo the config object literal. However, this is only for simplicity during the development
    //   process. As this parameter MUST be specified, a more obvious or robust way to require the library user to specify this may be 
    //   desirable.
    packageDocumentURL : ''
};

    EPUBcfi.Parser = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }
  
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "fragment": parse_fragment,
        "path": parse_path,
        "local_path": parse_local_path,
        "indexStep": parse_indexStep,
        "indirectionStep": parse_indirectionStep,
        "terminus": parse_terminus,
        "integer": parse_integer
      };
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "fragment";
      }
      
      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }
        
        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }
        
        rightmostFailuresExpected.push(failure);
      }
      
      function parse_fragment() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 8) === "epubcfi(") {
          result0 = "epubcfi(";
          pos += 8;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"epubcfi(\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_path();
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 41) {
              result2 = ")";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\")\"");
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, pathVal) { return { type:"CFIAST", cfiString:pathVal }; })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_path() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_indexStep();
        if (result0 !== null) {
          result1 = parse_local_path();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, stepVal, localPathVal) { return { type:"cfiString", path:stepVal, localPath:localPathVal }; })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_local_path() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result1 = parse_indexStep();
        if (result1 === null) {
          result1 = parse_indirectionStep();
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_indexStep();
            if (result1 === null) {
              result1 = parse_indirectionStep();
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result1 = parse_terminus();
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, localPathStepVal, termStepVal) { return { steps:localPathStepVal, termStep:termStepVal }; })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_indexStep() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 47) {
          result0 = "/";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"/\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_integer();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, stepLengthVal) { return { type:"indexStep", stepLength:stepLengthVal }; })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_indirectionStep() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.substr(pos, 2) === "!/") {
          result0 = "!/";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"!/\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_integer();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, stepLengthVal) { return { type:"indirectionStep", stepLength:stepLengthVal }; })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_terminus() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 58) {
          result0 = ":";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\":\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_integer();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, textOffsetValue) { return { type:"textTerminus", offsetValue:textOffsetValue }; })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_integer() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        if (input.charCodeAt(pos) === 48) {
          result0 = "0";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"0\"");
          }
        }
        if (result0 === null) {
          pos1 = pos;
          if (/^[1-9]/.test(input.charAt(pos))) {
            result0 = input.charAt(pos);
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("[1-9]");
            }
          }
          if (result0 !== null) {
            result1 = [];
            if (/^[0-9]/.test(input.charAt(pos))) {
              result2 = input.charAt(pos);
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("[0-9]");
              }
            }
            while (result2 !== null) {
              result1.push(result2);
              if (/^[0-9]/.test(input.charAt(pos))) {
                result2 = input.charAt(pos);
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("[0-9]");
                }
              }
            }
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, integerVal) { if (integerVal === "0") { return "0" } else { return integerVal[0].concat(integerVal[1].join('')) } })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      
      function cleanupExpected(expected) {
        expected.sort();
        
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      
      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        
        var line = 1;
        var column = 1;
        var seenCR = false;
        
        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }
        
        return { line: line, column: column };
      }
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var offset = Math.max(pos, rightmostFailuresPos);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = computeErrorPosition();
        
        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
      }
      
      return result;
    },
    
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      
      foundHumanized = found ? quote(found) : "end of input";
      
      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }
    
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };
  
  result.SyntaxError.prototype = Error.prototype;
  
  return result;
})();
 

    // Description: This model contains the implementation for "instructions" included in the EPUB CFI domain specific language (DSL). 
//   Lexing and parsing a CFI produces a set of executable instructions for processing a CFI (represented in the AST). 
//   This object contains a set of functions that implement each of the executable instructions in the AST. 

EPUBcfi.CFIInstructions = {

	// ------------------------------------------------------------------------------------ //
	//  "PUBLIC" METHODS (THE API)                                                          //
	// ------------------------------------------------------------------------------------ //

	// Description: Follows a step
	// Rationale: The use of children() is important here, as this jQuery method returns a tree of xml nodes, EXCLUDING
	//   CDATA and text nodes. When we index into the set of child elements, we are assuming that text nodes have been 
	//   excluded.
	// REFACTORING CANDIDATE: This should be called "followIndexStep"
	getNextNode : function (CFIStepValue, $currNode, stepTargetNodeId) {

		// Find the jquery index for the current node
		var $targetNode;
		var jqueryTargetNodeIndex = (CFIStepValue / 2) - 1;
		
		if (this.indexOutOfRange(jqueryTargetNodeIndex, $currNode.children().not('.cfiMarker').length)) {

			throw EPUBcfi.OutOfRangeError(jqueryTargetNodeIndex, $currNode.children().not('.cfiMarker').length, "");
		}

	   $targetNode = $($currNode.children().not('.cfiMarker')[jqueryTargetNodeIndex]);
		return $targetNode;
	},

	// Description: This instruction executes an indirection step, where a resource is retrieved using a 
	//   link contained on a attribute of the target element. The attribute that contains the link differs
	//   depending on the target. 
	followIndirectionStep : function (CFIStepValue, $currNode, stepTargetNodeId, $packageDocument) {

		var that = this;
		var indexOfFilenameStart;
		var URLForRetrieve;
		var jqueryTargetNodeIndex = (CFIStepValue / 2) - 1;
		var $targetNode;
		var contentDocHref;
		var $documentResult;
		var domParser;
		var contentDoc;

		// TODO: This check must be expanded to all the different types of indirection step
		// This is an item ref
		if ($currNode === undefined || !$currNode.is("itemref")) {

			throw EPUBcfi.NodeTypeError($currNode, "expected an itemref element");
		}

		// Load the resource
		// REFACTORING CANDIDATE: Currently, this expects the retrieval to be synchronous. This must be changed to be
		//   asynchronous.
		// Remove the package document filename from the package document url
		indexOfFilenameStart = EPUBcfi.Config.packageDocumentURL.lastIndexOf('/') + 1;
		URLForRetrieve = EPUBcfi.Config.packageDocumentURL.substr(0, indexOfFilenameStart);

		contentDocHref = 
			URLForRetrieve 
			+ $("#" + $currNode.attr("idref"), $packageDocument).attr("href");
		contentDoc = EPUBcfi.Config.retrieveResource(contentDocHref);

		if (that.indexOutOfRange(jqueryTargetNodeIndex, $(contentDoc.firstChild).children().not('.cfiMarker').length)) {

			throw EPUBcfi.OutOfRangeError(jqueryTargetNodeIndex, $(contentDoc.firstChild).children().not('.cfiMarker').length, "");
		}

		// contentDoc.firstChild is intended to return the html element
		$targetNode = $($(contentDoc.firstChild).children().not('.cfiMarker')[jqueryTargetNodeIndex]);

		// TODO: check for validity of returned node
		return $targetNode;
		
		// TODO: Other types of indirection
		// TODO: ($targetNode.is("iframe") || $targetNode.is("embed")) : src
		// TODO: ($targetNode.is("object")) : data
		// TODO: ($targetNode.is("image") || $targetNode.is("xlink:href")) : xlink:href
	},

	// Description: Injects an element at the specified text node
	// Arguments: a cfi text termination string, a jquery object to the current node
	textTermination : function ($currNode, textOffset, elementToInject) {

		var targetTextNode; 
		var originalText;
		var textWithInjection;

		// TODO: Out of range validation for text offset

		// Get the first node, this should be a text node
		if ($currNode === undefined) {

			throw EPUBcfi.NodeTypeError($currNode, "expected a terminating parent node");
		} 
		else if ($currNode.contents()[0] === undefined) {

			throw EPUBcfi.TerminusError("Text", "Text offset:" + textOffset, "no nodes found for termination condition");
		}

		$currNode = this.injectCFIMarkerIntoText($currNode, textOffset, elementToInject);
		return $currNode;
	},

	// ------------------------------------------------------------------------------------ //
	//  "PRIVATE" HELPERS                                                                   //
	// ------------------------------------------------------------------------------------ //

	// Description: Checks that the id assertion for the node target matches that on 
	//   the found node. 
	// TODO: This part of the spec is not included yet.
	targetIdMatchesIdAssertion : function ($foundNode, iDAssertion) {

		if ($foundNode.attr("id") === iDAssertion) {

			return true;
		}
		else {

			return false;
		}
	},

	indexOutOfRange : function (targetIndex, numChildElements) {

		return (targetIndex > numChildElements - 1) ? true : false;
	},

	// REFACTORING CANDIDATE: Not really sure if this is the best way to do this. I kinda hate it. 
	injectCFIMarkerIntoText : function ($currNode, textOffset, elementToInject) {

		// Get child nodes, including text nodes
		$nodeList = $currNode.contents();

		var nodeNum;
		var currNodeLength;
		var currTextPosition = 0;
		var nodeOffset;
		var originalText;
		var $injectedNode;
		var $newTextNode;
		// The iteration counter may be incorrect here (should be $nodeList.length - 1 ??)
		for (nodeNum = 0; nodeNum <= $nodeList.length; nodeNum++) {

			if ($nodeList[nodeNum].nodeType === 3) {

				currNodeMaxIndex = ($nodeList[nodeNum].nodeValue.length - 1) + currTextPosition;
				nodeOffset = textOffset - currTextPosition;

				if (currNodeMaxIndex >= textOffset) {

					// This node is going to be split and the components re-inserted
					originalText = $nodeList[nodeNum].nodeValue;	

					// Before part
				 	$nodeList[nodeNum].nodeValue = originalText.slice(0, nodeOffset);

					// Injected element
					$injectedNode = $(elementToInject).insertAfter($nodeList.eq(nodeNum));

					// After part
					$newTextNode = $(document.createTextNode(originalText.slice(nodeOffset, originalText.length)));
					$($newTextNode).insertAfter($injectedNode);

					return $currNode;
				}
				else {

					currTextPosition = currTextPosition + currNodeMaxIndex;
				}
			}
		}

		throw EPUBcfi.TerminusError("Text", "Text offset:" + textOffset, "The offset exceeded the length of the text");
	}
};




    // Description: This is an interpreter that inteprets an Abstract Syntax Tree (AST) for a CFI. The result of executing the interpreter
//   is to inject an element, or set of elements, into an EPUB content document (which is just an XHTML document). These element(s) will
//   represent the position or area in the EPUB referenced by a CFI.
// Rationale: The AST is a clean and readable expression of the step-terminus structure of a CFI. Although building an interpreter adds to the
//   CFI infrastructure, it provides a number of benefits. First, it emphasizes a clear separation of concerns between lexing/parsing a
//   CFI, which involves some complexity related to escaped and special characters, and the execution of the underlying set of steps 
//   represented by the CFI. Second, it will be easier to extend the interpreter to account for new/altered CFI steps (say for references
//   to vector objects or multiple CFIs) than if lexing, parsing and interpretation were all handled in a single step. Finally, Readium's objective is 
//   to demonstrate implementation of the EPUB 3.0 spec. An implementation with a strong separation of concerns that conforms to 
//   well-understood patterns for DSL processing should be easier to communicate, analyze and understand. 
// REFACTORING CANDIDATE: node type errors shouldn't really be possible if the CFI syntax is correct and the parser is error free. 
//   Might want to make the script die in those instances, once the grammar and interpreter are more stable. 
// REFACTORING CANDIDATE: The use of the 'nodeType' property is confusing as this is a DOM node property and the two are unrelated. 
//   Whoops. There shouldn't be any interference, however, I think this should be changed. 

EPUBcfi.Interpreter = {

    // ------------------------------------------------------------------------------------ //
    //  "PUBLIC" METHODS (THE API)                                                          //
    // ------------------------------------------------------------------------------------ //

    // Description: This method executes the intepreter on a CFI AST. The CFI spec requires 
    //   the package document as a starting point.
    // Arguments: A CFI (string)
    injectCFIReferenceElements : function (CFI) {
        
        // Parse the cfi
        var CFIAST = EPUBcfi.Parser.parse(CFI);

        // Check node type; throw error if wrong type
        if (CFIAST === undefined || CFIAST.type !== "CFIAST") { 

            throw EPUBcfi.NodeTypeError(CFIAST, "expected CFI AST root node");
        }

        // Get the package document and walk the tree
        var $packageDocument = $(EPUBcfi.Config.retrieveResource(EPUBcfi.Config.packageDocumentURL));        
        return this.interpretCFIStringNode(CFIAST.cfiString, $packageDocument);
    },

    // ------------------------------------------------------------------------------------ //
    //  "PRIVATE" HELPERS                                                                   //
    // ------------------------------------------------------------------------------------ //

    interpretCFIStringNode : function (cfiStringNode, $packageDocument) {

        if (cfiStringNode === undefined || cfiStringNode.type !== "cfiString") {

            throw EPUBcfi.NodeTypeError(cfiStringNode, "expected CFI string node");
        }

        // Get the "package element"
        var $packageElement = $($("package", $packageDocument)[0]);

        // Interpet the path node (the package document step)
        var $currElement = this.interpretIndexStepNode(cfiStringNode.path, $packageElement);

        // Interpret the local_path node, which is a set of steps and and a terminus condition
        var stepNum = 0;
        var nextStepNode;
        for (stepNum = 0 ; stepNum <= cfiStringNode.localPath.steps.length - 1 ; stepNum++) {
        
            nextStepNode = cfiStringNode.localPath.steps[stepNum];

            if (nextStepNode.type === "indexStep") {

                $currElement = this.interpretIndexStepNode(nextStepNode, $currElement);
            }
            else if (nextStepNode.type === "indirectionStep") {

                $currElement = this.interpretIndirectionStepNode(nextStepNode, $currElement, $packageDocument);
            }
        }

        // TODO: Validity check on current element
        $currElement = this.interpretTextTerminusNode(cfiStringNode.localPath.termStep, $currElement);

        // Return the element that was injected into
        return $currElement;
    },

    interpretIndexStepNode : function (indexStepNode, $currElement) {

        // Check node type; throw error if wrong type
        if (indexStepNode === undefined || indexStepNode.type !== "indexStep") {

            throw EPUBcfi.NodeTypeError(indexStepNode, "expected index step node");
        }

        // Step
        var $stepTarget = EPUBcfi.CFIInstructions.getNextNode(indexStepNode.stepLength, $currElement, undefined);

        // return target element
        return $stepTarget;
    },

    interpretIndirectionStepNode : function (indirectionStepNode, $currElement, $packageDocument) {

        // Check node type; throw error if wrong type
        if (indirectionStepNode === undefined || indirectionStepNode.type !== "indirectionStep") {

            throw EPUBcfi.NodeTypeError(indirectionStepNode, "expected indirection step node");
        }

        // indirection step
        var $stepTarget = EPUBcfi.CFIInstructions.followIndirectionStep(
            indirectionStepNode.stepLength, 
            $currElement,
            undefined,
            $packageDocument);

        // return target element
        return $stepTarget;
    },

    interpretTextTerminusNode : function (terminusNode, $currElement) {

        if (terminusNode === undefined || terminusNode.type !== "textTerminus") {

            throw EPUBcfi.NodeTypeError(terminusNode, "expected text terminus node");
        }

        var $elementInjectedInto = EPUBcfi.CFIInstructions.textTermination(
            $currElement, 
            terminusNode.offsetValue, 
            EPUBcfi.Config.cfiMarkerElements.textPointMarker);

        return $elementInjectedInto;
    }
};

    // Description: This is a set of runtime errors that the CFI interpreter can throw. 
// Rationale: These error types extend the basic javascript error object so error things like the stack trace are 
//   included with the runtime errors. 

// REFACTORING CANDIDATE: This type of error may not be required in the long run. The parser should catch any syntax errors, 
//   provided it is error-free, and as such, the AST should never really have any node type errors, which are essentially errors
//   in the structure of the AST. This error should probably be refactored out when the grammar and interpreter are more stable.
EPUBcfi.NodeTypeError = function (node, message) {

    function NodeTypeError () {

        this.node = node;
    }

    NodeTypeError.prototype = new Error(message);
    NodeTypeError.constructor = NodeTypeError;

    return new NodeTypeError();
};

// REFACTORING CANDIDATE: Might make sense to include some more specifics about the out-of-rangeyness.
EPUBcfi.OutOfRangeError = function (targetIndex, maxIndex, message) {

    function OutOfRangeError () {

        this.targetIndex = targetIndex;
        this.maxIndex = maxIndex;
    }

    OutOfRangeError.prototype = new Error(message);
    OutOfRangeError.constructor = OutOfRangeError()

    return new OutOfRangeError();
};

// REFACTORING CANDIDATE: This is a bit too general to be useful. When I have a better understanding of the type of errors
//   that can occur with the various terminus conditions, it'll make more sense to revisit this. 
EPUBcfi.TerminusError = function (terminusType, terminusCondition, message) {

    function TerminusError () {

        this.terminusType = terminusType;
        this.terminusCondition = terminusCondition;
    }

    TerminusError.prototype = new Error(message);
    TerminusError.constructor = TerminusError();

    return new TerminusError();
};


    if (global.EPUBcfi) {

        throw new Error('The EPUB cfi library has already been defined');
    }
    else {

        global.EPUBcfi = EPUBcfi;
    }
}) (typeof window === 'undefined' ? this : window);
