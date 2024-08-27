let wasm_bindgen;
(function() {
    const __exports = {};
    let wasm;

    const heap = new Array(32).fill(undefined);

    heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let WASM_VECTOR_LEN = 0;

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (typeof(arg) !== 'string') throw new Error('expected a string argument');

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        if (ret.read !== arg.length) throw new Error('failed to pass whole string');
        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    if (typeof(heap_next) !== 'number') throw new Error('corrupt heap');

    heap[idx] = obj;
    return idx;
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function _assertNum(n) {
    if (typeof(n) !== 'number') throw new Error('expected a number argument');
}

function _assertBoolean(n) {
    if (typeof(n) !== 'boolean') {
        throw new Error('expected a boolean argument');
    }
}

let cachedFloat64Memory0 = new Float64Array();

function getFloat64Memory0() {
    if (cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}

function logError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        let error = (function () {
            try {
                return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
            } catch(_) {
                return "<failed to stringify thrown value>";
            }
        }());
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
        throw e;
    }
}
function __wbg_adapter_40(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        _assertNum(arg0);
        _assertNum(arg1);
        wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hce64a91c94f63c07(retptr, arg0, arg1, addHeapObject(arg2));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function makeClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
                state.a = 0;

            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_43(arg0, arg1) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hde900ac6926d096c(arg0, arg1);
}

function __wbg_adapter_46(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1b284922c31349f3(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_49(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4482da7d1f1a9224(arg0, arg1, addHeapObject(arg2));
}

/**
* @returns {string}
*/
__exports.version_dove = function() {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.version_dove(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
    }
};

/**
* @returns {string}
*/
__exports.version_aptos = function() {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.version_aptos(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(r0, r1);
    }
};

/**
* @param {string} message
* @returns {Promise<string>}
*/
__exports.processing_paths_for_console = function(message) {
    const ptr0 = passStringToWasm0(message, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.processing_paths_for_console(ptr0, len0);
    return takeObject(ret);
};

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function _assertBigInt(n) {
    if (typeof(n) !== 'bigint') throw new Error('expected a bigint argument');
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
function __wbg_adapter_290(arg0, arg1, arg2, arg3) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h1e925e8d7cb70d47(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
*/
class Dove {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    static __wrap(ptr) {
        const obj = Object.create(Dove.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_dove_free(ptr);
    }
    /**
    * @param {string} path
    * @returns {Promise<any>}
    */
    test_positions(path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_test_positions(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @returns {Promise<any>}
    */
    entry_positions(path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_entry_positions(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @returns {Promise<any>}
    */
    scripts_positions(path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_scripts_positions(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @returns {Promise<any>}
    */
    view_functions_positions(path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_view_functions_positions(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} phrase
    * @param {boolean} match_case
    * @param {boolean} is_regex
    * @param {string | undefined} folder
    * @returns {Promise<any>}
    */
    global_search(phrase, match_case, is_regex, folder) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(phrase, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertBoolean(match_case);
        _assertBoolean(is_regex);
        var ptr1 = isLikeNone(folder) ? 0 : passStringToWasm0(folder, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.dove_global_search(this.ptr, ptr0, len0, match_case, is_regex, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @returns {Promise<any>}
    */
    format_current_file(path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_format_current_file(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<Dove>}
    */
    static new() {
        const ret = wasm.dove_new();
        return takeObject(ret);
    }
    /**
    * on_panic: (fn_name: String, stack: String) => void
    * @param {string} fn_name
    * @param {Function} on_panic
    */
    set_panic_hook(fn_name, on_panic) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(fn_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.dove_set_panic_hook(this.ptr, ptr0, len0, addHeapObject(on_panic));
    }
    /**
    * @returns {Promise<any>}
    */
    projects() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_projects(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    current_project() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_current_project(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {number} id
    * @returns {Promise<any>}
    */
    select_project(id) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        _assertNum(id);
        const ret = wasm.dove_select_project(this.ptr, id);
        return takeObject(ret);
    }
    /**
    * @param {string} name
    * @returns {Promise<any>}
    */
    create_project(name) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_create_project(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} git_url
    * @param {string} rev
    * @param {string | undefined} name
    * @returns {Promise<any>}
    */
    create_project_with_git(git_url, rev, name) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(git_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(rev, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(name) ? 0 : passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.dove_create_project_with_git(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return takeObject(ret);
    }
    /**
    * @param {string} hash
    * @param {string | undefined} name
    * @returns {Promise<any>}
    */
    create_project_with_link(hash, name) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(name) ? 0 : passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.dove_create_project_with_link(this.ptr, ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {Uint8Array} archive
    * @param {string | undefined} name
    * @returns {Promise<any>}
    */
    crate_project_with_archive(archive, name) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passArray8ToWasm0(archive, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(name) ? 0 : passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.dove_crate_project_with_archive(this.ptr, ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {number} id
    * @returns {Promise<any>}
    */
    remove_project(id) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        _assertNum(id);
        const ret = wasm.dove_remove_project(this.ptr, id);
        return takeObject(ret);
    }
    /**
    * @param {number} id
    * @param {string} new_name
    * @returns {Promise<any>}
    */
    rename_project(id, new_name) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        _assertNum(id);
        const ptr0 = passStringToWasm0(new_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_rename_project(this.ptr, id, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    share_project() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_share_project(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    upload_project() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_upload_project(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    project_tree() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_project_tree(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @returns {Promise<any>}
    */
    read_project_file(path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_read_project_file(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @param {string} content
    * @returns {Promise<any>}
    */
    write_project_file(path, content) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(content, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.dove_write_project_file(this.ptr, ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @returns {Promise<any>}
    */
    remove_project_file(path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_remove_project_file(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @returns {Promise<any>}
    */
    remove_project_dir(path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_remove_project_dir(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @param {string} new_path
    * @returns {Promise<any>}
    */
    rename_project_entry(path, new_path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(new_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.dove_rename_project_entry(this.ptr, ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @returns {Promise<any>}
    */
    create_project_dir(path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_create_project_dir(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} path
    * @param {boolean} as_string
    * @returns {Promise<any>}
    */
    global_file(path, as_string) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertBoolean(as_string);
        const ret = wasm.dove_global_file(this.ptr, ptr0, len0, as_string);
        return takeObject(ret);
    }
    /**
    * @param {boolean} clean_home
    * @returns {Promise<any>}
    */
    clean_project(clean_home) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        _assertBoolean(clean_home);
        const ret = wasm.dove_clean_project(this.ptr, clean_home);
        return takeObject(ret);
    }
    /**
    * @param {boolean} save_metadata
    * @param {string} included_artifacts
    * @returns {Promise<any>}
    */
    compile_project(save_metadata, included_artifacts) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        _assertBoolean(save_metadata);
        const ptr0 = passStringToWasm0(included_artifacts, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_compile_project(this.ptr, save_metadata, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {boolean | undefined} include_impl
    * @param {boolean | undefined} include_specs
    * @param {boolean | undefined} specs_inlined
    * @param {boolean | undefined} include_dep_diagram
    * @param {boolean | undefined} collapsed_sections
    * @param {string | undefined} landing_page_template
    * @param {string | undefined} references_file
    * @returns {Promise<any>}
    */
    document_project(include_impl, include_specs, specs_inlined, include_dep_diagram, collapsed_sections, landing_page_template, references_file) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        if (!isLikeNone(include_impl)) {
            _assertBoolean(include_impl);
        }
        if (!isLikeNone(include_specs)) {
            _assertBoolean(include_specs);
        }
        if (!isLikeNone(specs_inlined)) {
            _assertBoolean(specs_inlined);
        }
        if (!isLikeNone(include_dep_diagram)) {
            _assertBoolean(include_dep_diagram);
        }
        if (!isLikeNone(collapsed_sections)) {
            _assertBoolean(collapsed_sections);
        }
        var ptr0 = isLikeNone(landing_page_template) ? 0 : passStringToWasm0(landing_page_template, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(references_file) ? 0 : passStringToWasm0(references_file, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.dove_document_project(this.ptr, isLikeNone(include_impl) ? 0xFFFFFF : include_impl ? 1 : 0, isLikeNone(include_specs) ? 0xFFFFFF : include_specs ? 1 : 0, isLikeNone(specs_inlined) ? 0xFFFFFF : specs_inlined ? 1 : 0, isLikeNone(include_dep_diagram) ? 0xFFFFFF : include_dep_diagram ? 1 : 0, isLikeNone(collapsed_sections) ? 0xFFFFFF : collapsed_sections ? 1 : 0, ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {string} account
    * @param {string | undefined} included_artifacts
    * @param {string | undefined} profile
    * @returns {Promise<any>}
    */
    verify_project(account, included_artifacts, profile) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(included_artifacts) ? 0 : passStringToWasm0(included_artifacts, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.dove_verify_project(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} filter
    * @param {bigint | undefined} instruction_execution_bound
    * @returns {Promise<any>}
    */
    test_project(filter, instruction_execution_bound) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        var ptr0 = isLikeNone(filter) ? 0 : passStringToWasm0(filter, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        if (!isLikeNone(instruction_execution_bound)) {
            _assertBigInt(instruction_execution_bound);
        }
        const ret = wasm.dove_test_project(this.ptr, ptr0, len0, !isLikeNone(instruction_execution_bound), isLikeNone(instruction_execution_bound) ? 0n : instruction_execution_bound);
        return takeObject(ret);
    }
    /**
    * @param {string} seed
    * @param {string} address_name
    * @param {boolean | undefined} override_size_check
    * @param {string | undefined} included_artifacts
    * @param {string | undefined} profile
    * @param {bigint | undefined} gas_unit_price
    * @param {bigint | undefined} max_gas
    * @param {bigint | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    create_resource_account_and_publish_package(seed, address_name, override_size_check, included_artifacts, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(seed, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(address_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        if (!isLikeNone(override_size_check)) {
            _assertBoolean(override_size_check);
        }
        var ptr2 = isLikeNone(included_artifacts) ? 0 : passStringToWasm0(included_artifacts, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertBigInt(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertBigInt(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertBigInt(expiration_secs);
        }
        const ret = wasm.dove_create_resource_account_and_publish_package(this.ptr, ptr0, len0, ptr1, len1, isLikeNone(override_size_check) ? 0xFFFFFF : override_size_check ? 1 : 0, ptr2, len2, ptr3, len3, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0n : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0n : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0n : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    transactional_test() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_transactional_test(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {boolean | undefined} override_size_check
    * @param {string | undefined} included_artifacts_args
    * @param {string | undefined} profile
    * @param {number | undefined} gas_unit_price
    * @param {number | undefined} max_gas
    * @param {number | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    publish(override_size_check, included_artifacts_args, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        if (!isLikeNone(override_size_check)) {
            _assertBoolean(override_size_check);
        }
        var ptr0 = isLikeNone(included_artifacts_args) ? 0 : passStringToWasm0(included_artifacts_args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertNum(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertNum(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertNum(expiration_secs);
        }
        const ret = wasm.dove_publish(this.ptr, isLikeNone(override_size_check) ? 0xFFFFFF : override_size_check ? 1 : 0, ptr0, len0, ptr1, len1, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0 : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0 : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0 : expiration_secs);
        return takeObject(ret);
    }
    /**
    * return publish transaction without sending
    *     included_artifacts_args - default "sparse"
    *     return: payload JSON as STRING
    * @param {boolean | undefined} override_size_check
    * @param {string | undefined} included_artifacts_args
    * @param {string | undefined} profile
    * @param {number | undefined} gas_unit_price
    * @param {number | undefined} max_gas
    * @param {number | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    publish_return_payload(override_size_check, included_artifacts_args, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        if (!isLikeNone(override_size_check)) {
            _assertBoolean(override_size_check);
        }
        var ptr0 = isLikeNone(included_artifacts_args) ? 0 : passStringToWasm0(included_artifacts_args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertNum(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertNum(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertNum(expiration_secs);
        }
        const ret = wasm.dove_publish_return_payload(this.ptr, isLikeNone(override_size_check) ? 0xFFFFFF : override_size_check ? 1 : 0, ptr0, len0, ptr1, len1, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0 : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0 : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0 : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @param {string} member_id
    * @param {string | undefined} args
    * @param {string | undefined} type_args
    * @param {string | undefined} profile
    * @param {number | undefined} gas_unit_price
    * @param {number | undefined} max_gas
    * @param {number | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    run_function(member_id, args, type_args, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(member_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(args) ? 0 : passStringToWasm0(args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(type_args) ? 0 : passStringToWasm0(type_args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertNum(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertNum(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertNum(expiration_secs);
        }
        const ret = wasm.dove_run_function(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0 : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0 : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0 : expiration_secs);
        return takeObject(ret);
    }
    /**
    * Run function in node. (Only return payload without run)
    *     args:
    *     return: payload JSON as STRING
    * @param {string} member_id
    * @param {string | undefined} args
    * @param {string | undefined} type_args
    * @param {string | undefined} profile
    * @param {number | undefined} gas_unit_price
    * @param {number | undefined} max_gas
    * @param {number | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    run_function_return_payload(member_id, args, type_args, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(member_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(args) ? 0 : passStringToWasm0(args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(type_args) ? 0 : passStringToWasm0(type_args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertNum(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertNum(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertNum(expiration_secs);
        }
        const ret = wasm.dove_run_function_return_payload(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0 : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0 : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0 : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} script_path
    * @param {string | undefined} compiled_script_path
    * @param {string | undefined} args
    * @param {string | undefined} type_args
    * @param {string | undefined} framework_git_rev
    * @param {string | undefined} framework_local_dir
    * @param {string | undefined} profile
    * @param {number | undefined} gas_unit_price
    * @param {number | undefined} max_gas
    * @param {boolean | undefined} skip_fetch_latest_git_deps
    * @param {number | undefined} bytecode_version
    * @param {number | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    run_script(script_path, compiled_script_path, args, type_args, framework_git_rev, framework_local_dir, profile, gas_unit_price, max_gas, skip_fetch_latest_git_deps, bytecode_version, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        var ptr0 = isLikeNone(script_path) ? 0 : passStringToWasm0(script_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(compiled_script_path) ? 0 : passStringToWasm0(compiled_script_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(args) ? 0 : passStringToWasm0(args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(type_args) ? 0 : passStringToWasm0(type_args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(framework_git_rev) ? 0 : passStringToWasm0(framework_git_rev, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(framework_local_dir) ? 0 : passStringToWasm0(framework_local_dir, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        var ptr6 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertNum(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertNum(max_gas);
        }
        if (!isLikeNone(skip_fetch_latest_git_deps)) {
            _assertBoolean(skip_fetch_latest_git_deps);
        }
        if (!isLikeNone(bytecode_version)) {
            _assertNum(bytecode_version);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertNum(expiration_secs);
        }
        const ret = wasm.dove_run_script(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0 : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0 : max_gas, isLikeNone(skip_fetch_latest_git_deps) ? 0xFFFFFF : skip_fetch_latest_git_deps ? 1 : 0, !isLikeNone(bytecode_version), isLikeNone(bytecode_version) ? 0 : bytecode_version, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0 : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} script_path
    * @param {string | undefined} compiled_script_path
    * @param {string | undefined} args
    * @param {string | undefined} type_args
    * @param {string | undefined} framework_git_rev
    * @param {string | undefined} framework_local_dir
    * @param {string | undefined} profile
    * @param {number | undefined} gas_unit_price
    * @param {number | undefined} max_gas
    * @param {boolean | undefined} skip_fetch_latest_git_deps
    * @param {number | undefined} bytecode_version
    * @param {number | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    run_script_return_payload(script_path, compiled_script_path, args, type_args, framework_git_rev, framework_local_dir, profile, gas_unit_price, max_gas, skip_fetch_latest_git_deps, bytecode_version, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        var ptr0 = isLikeNone(script_path) ? 0 : passStringToWasm0(script_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(compiled_script_path) ? 0 : passStringToWasm0(compiled_script_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(args) ? 0 : passStringToWasm0(args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(type_args) ? 0 : passStringToWasm0(type_args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(framework_git_rev) ? 0 : passStringToWasm0(framework_git_rev, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = isLikeNone(framework_local_dir) ? 0 : passStringToWasm0(framework_local_dir, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len5 = WASM_VECTOR_LEN;
        var ptr6 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len6 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertNum(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertNum(max_gas);
        }
        if (!isLikeNone(skip_fetch_latest_git_deps)) {
            _assertBoolean(skip_fetch_latest_git_deps);
        }
        if (!isLikeNone(bytecode_version)) {
            _assertNum(bytecode_version);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertNum(expiration_secs);
        }
        const ret = wasm.dove_run_script_return_payload(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0 : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0 : max_gas, isLikeNone(skip_fetch_latest_git_deps) ? 0xFFFFFF : skip_fetch_latest_git_deps ? 1 : 0, !isLikeNone(bytecode_version), isLikeNone(bytecode_version) ? 0 : bytecode_version, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0 : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @param {string} member_id
    * @param {string | undefined} args
    * @param {string | undefined} type_args
    * @param {string | undefined} profile
    * @param {number | undefined} gas_unit_price
    * @param {number | undefined} max_gas
    * @param {number | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    view_function(member_id, args, type_args, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(member_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(args) ? 0 : passStringToWasm0(args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(type_args) ? 0 : passStringToWasm0(type_args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertNum(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertNum(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertNum(expiration_secs);
        }
        const ret = wasm.dove_view_function(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0 : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0 : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0 : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @param {string} member_id
    * @param {string | undefined} args
    * @param {string | undefined} type_args
    * @param {string | undefined} profile
    * @param {number | undefined} gas_unit_price
    * @param {number | undefined} max_gas
    * @param {number | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    view_function_return_payload(member_id, args, type_args, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(member_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(args) ? 0 : passStringToWasm0(args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(type_args) ? 0 : passStringToWasm0(type_args, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertNum(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertNum(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertNum(expiration_secs);
        }
        const ret = wasm.dove_view_function_return_payload(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0 : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0 : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0 : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @param {string} value
    * @param {string} tp
    * @returns {Promise<any>}
    */
    check_parameter(value, tp) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(tp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.dove_check_parameter(this.ptr, ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {string} tp
    * @returns {any}
    */
    check_type_parameter(tp) {
        try {
            if (this.ptr == 0) throw new Error('Attempt to use a moved value');
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertNum(this.ptr);
            const ptr0 = passStringToWasm0(tp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.dove_check_type_parameter(retptr, this.ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} account
    * @param {string | undefined} profile
    * @param {string | undefined} query
    * @returns {Promise<any>}
    */
    package_list(account, profile, query) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(query) ? 0 : passStringToWasm0(query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.dove_package_list(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return takeObject(ret);
    }
    /**
    * @param {string} password
    * @returns {Promise<any>}
    */
    unlock_config(password) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(password, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_unlock_config(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} pin
    * @returns {Promise<any>}
    */
    set_config_pin(pin) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        var ptr0 = isLikeNone(pin) ? 0 : passStringToWasm0(pin, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_set_config_pin(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    is_config_unlocked() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_is_config_unlocked(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    is_config_encrypted() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_is_config_encrypted(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} private_key
    * @param {string | undefined} network
    * @param {string | undefined} profile
    * @param {string | undefined} rest_url
    * @param {string | undefined} faucet_url
    * @returns {Promise<any>}
    */
    init_account(private_key, network, profile, rest_url, faucet_url) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        var ptr0 = isLikeNone(private_key) ? 0 : passStringToWasm0(private_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(network) ? 0 : passStringToWasm0(network, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(rest_url) ? 0 : passStringToWasm0(rest_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(faucet_url) ? 0 : passStringToWasm0(faucet_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        const ret = wasm.dove_init_account(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    accounts() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_accounts(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {string} name
    * @returns {Promise<any>}
    */
    get_account(name) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_get_account(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} address
    * @returns {Promise<any>}
    */
    remove_account(address) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_remove_account(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} account
    * @param {string | undefined} profile
    * @param {bigint | undefined} gas_unit_price
    * @param {bigint | undefined} max_gas
    * @param {bigint | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    account_create(account, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertBigInt(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertBigInt(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertBigInt(expiration_secs);
        }
        const ret = wasm.dove_account_create(this.ptr, ptr0, len0, ptr1, len1, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0n : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0n : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0n : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @param {string} seed
    * @param {string | undefined} authentication_key
    * @param {string | undefined} profile
    * @param {bigint | undefined} gas_unit_price
    * @param {bigint | undefined} max_gas
    * @param {bigint | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    account_create_resource_account(seed, authentication_key, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(seed, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(authentication_key) ? 0 : passStringToWasm0(authentication_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertBigInt(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertBigInt(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertBigInt(expiration_secs);
        }
        const ret = wasm.dove_account_create_resource_account(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0n : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0n : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0n : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @param {string} account
    * @param {string | undefined} profile
    * @param {number | undefined} amount
    * @returns {Promise<any>}
    */
    account_fund_with_faucet(account, profile, amount) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        if (!isLikeNone(amount)) {
            _assertNum(amount);
        }
        const ret = wasm.dove_account_fund_with_faucet(this.ptr, ptr0, len0, ptr1, len1, !isLikeNone(amount), isLikeNone(amount) ? 0 : amount);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} account
    * @param {string | undefined} query
    * @param {string | undefined} profile
    * @param {string | undefined} resp_url
    * @returns {Promise<any>}
    */
    account_list(account, query, profile, resp_url) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        var ptr0 = isLikeNone(account) ? 0 : passStringToWasm0(account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(query) ? 0 : passStringToWasm0(query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(resp_url) ? 0 : passStringToWasm0(resp_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.dove_account_list(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} public_key
    * @param {string | undefined} profile
    * @returns {Promise<any>}
    */
    account_lookup_address(public_key, profile) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        var ptr0 = isLikeNone(public_key) ? 0 : passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.dove_account_lookup_address(this.ptr, ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {string | undefined} private_key
    * @param {string | undefined} save_to_profile
    * @param {boolean} pubskip_saving_profile
    * @param {string | undefined} profile
    * @param {bigint | undefined} gas_unit_price
    * @param {bigint | undefined} max_gas
    * @param {bigint | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    account_rotate_key(private_key, save_to_profile, pubskip_saving_profile, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        var ptr0 = isLikeNone(private_key) ? 0 : passStringToWasm0(private_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(save_to_profile) ? 0 : passStringToWasm0(save_to_profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        _assertBoolean(pubskip_saving_profile);
        var ptr2 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertBigInt(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertBigInt(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertBigInt(expiration_secs);
        }
        const ret = wasm.dove_account_rotate_key(this.ptr, ptr0, len0, ptr1, len1, pubskip_saving_profile, ptr2, len2, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0n : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0n : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0n : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @param {string} account
    * @param {bigint} amount
    * @param {string | undefined} profile
    * @param {bigint | undefined} gas_unit_price
    * @param {bigint | undefined} max_gas
    * @param {bigint | undefined} expiration_secs
    * @returns {Promise<any>}
    */
    account_transfer_coins(account, amount, profile, gas_unit_price, max_gas, expiration_secs) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(account, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertBigInt(amount);
        var ptr1 = isLikeNone(profile) ? 0 : passStringToWasm0(profile, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        if (!isLikeNone(gas_unit_price)) {
            _assertBigInt(gas_unit_price);
        }
        if (!isLikeNone(max_gas)) {
            _assertBigInt(max_gas);
        }
        if (!isLikeNone(expiration_secs)) {
            _assertBigInt(expiration_secs);
        }
        const ret = wasm.dove_account_transfer_coins(this.ptr, ptr0, len0, amount, ptr1, len1, !isLikeNone(gas_unit_price), isLikeNone(gas_unit_price) ? 0n : gas_unit_price, !isLikeNone(max_gas), isLikeNone(max_gas) ? 0n : max_gas, !isLikeNone(expiration_secs), isLikeNone(expiration_secs) ? 0n : expiration_secs);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    dependencies_structure() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_dependencies_structure(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    project_structure() {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ret = wasm.dove_project_structure(this.ptr);
        return takeObject(ret);
    }
    /**
    * @param {string} file_path
    * @returns {Promise<any>}
    */
    file_structure(file_path) {
        if (this.ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.ptr);
        const ptr0 = passStringToWasm0(file_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.dove_file_structure(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
}
__exports.Dove = Dove;
/**
*/
class SharedLinks {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sharedlinks_free(ptr);
    }
    /**
    * @returns {Promise<any>}
    */
    static list() {
        const ret = wasm.sharedlinks_list();
        return takeObject(ret);
    }
    /**
    * @param {string} hash
    * @returns {Promise<void>}
    */
    static remove_by_hash(hash) {
        const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sharedlinks_remove_by_hash(ptr0, len0);
        return takeObject(ret);
    }
}
__exports.SharedLinks = SharedLinks;

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_dove_new = function() { return logError(function (arg0) {
        const ret = Dove.__wrap(arg0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_e534902f0c8bd56f = function() { return logError(function () {
        const ret = new Error();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_stack_3f5eda429bfa5a7e = function() { return logError(function (arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments) };
    imports.wbg.__wbg_error_532653bebd8f34df = function() { return logError(function (arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    }, arguments) };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        _assertNum(ret);
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_i64 = function(arg0) {
        const ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = getObject(arg0) == getObject(arg1);
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_set_20cbc34131e76824 = function() { return logError(function (arg0, arg1, arg2) {
        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    }, arguments) };
    imports.wbg.__wbg_Window_2323448e22bf340f = function() { return logError(function (arg0) {
        const ret = getObject(arg0).Window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbg_WorkerGlobalScope_4f52a4f4757baa51 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).WorkerGlobalScope;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_bb13ba737d1fd37d = function() { return logError(function (arg0) {
        const ret = getObject(arg0).global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_indexedDB_553c6eee256a5956 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).indexedDB;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_fetch_3894579f6e2af3be = function() { return logError(function (arg0) {
        const ret = fetch(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_log_da6fad4f129ab8a2 = function() { return logError(function (arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_error_081d1fbec6a99920 = function() { return logError(function (arg0, arg1) {
        console.error(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_warn_58a5d2ebdbc174d8 = function() { return logError(function (arg0, arg1) {
        console.warn(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_info_6cf11b43675c91bc = function() { return logError(function (arg0, arg1) {
        console.info(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_debug_612134ec84f9c02c = function() { return logError(function (arg0, arg1) {
        console.debug(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_randomFillSync_6894564c2c334c42 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_805f1c3d65988a5a = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_crypto_e1d53a1d73fb10b8 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_process_038c26bf42b093f8 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_versions_ab37218d2f0b24a8 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_node_080f4b19d15bc1fe = function() { return logError(function (arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_require_78a3dcfbdba9cbce = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_msCrypto_6e7d3e1f92610cbb = function() { return logError(function (arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_Window_acc97ff9f5d2c7b4 = function() { return logError(function (arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Window;
        } catch {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_location_8cc8ccf27e342c0a = function() { return logError(function (arg0) {
        const ret = getObject(arg0).location;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_indexedDB_050f0962ab607ac5 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).indexedDB;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setTimeout_d6fcf0d9067b8e64 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_open_c5d5fb2df44b9d10 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).open(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_result_9e399c14676970d9 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).result;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_error_aacf5ac191e54ed0 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).error;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_readyState_fb287f170113917c = function() { return logError(function (arg0) {
        const ret = getObject(arg0).readyState;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setonsuccess_5f71593bc51653a3 = function() { return logError(function (arg0, arg1) {
        getObject(arg0).onsuccess = getObject(arg1);
    }, arguments) };
    imports.wbg.__wbg_setonerror_d5771cc5bf9ea74c = function() { return logError(function (arg0, arg1) {
        getObject(arg0).onerror = getObject(arg1);
    }, arguments) };
    imports.wbg.__wbg_target_bf704b7db7ad1387 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).target;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_WorkerGlobalScope_16bb97a4549a3f21 = function() { return logError(function (arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof WorkerGlobalScope;
        } catch {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_indexedDB_8d9e9ab4616df7f0 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).indexedDB;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_fetch_749a56934f95c96c = function() { return logError(function (arg0, arg1) {
        const ret = getObject(arg0).fetch(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setTimeout_e291d02d3d531438 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setonabort_404bee3b9940d03d = function() { return logError(function (arg0, arg1) {
        getObject(arg0).onabort = getObject(arg1);
    }, arguments) };
    imports.wbg.__wbg_setoncomplete_3e57a8cec8327f66 = function() { return logError(function (arg0, arg1) {
        getObject(arg0).oncomplete = getObject(arg1);
    }, arguments) };
    imports.wbg.__wbg_setonerror_00051c0213f27b2c = function() { return logError(function (arg0, arg1) {
        getObject(arg0).onerror = getObject(arg1);
    }, arguments) };
    imports.wbg.__wbg_abort_6dd66d1222931f14 = function() { return handleError(function (arg0) {
        getObject(arg0).abort();
    }, arguments) };
    imports.wbg.__wbg_objectStore_f17976b0e6377830 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).objectStore(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_protocol_70cc72a5ff78dc5f = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg1).protocol;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments) };
    imports.wbg.__wbg_host_f82dbbd8bb5ef24a = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg1).host;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments) };
    imports.wbg.__wbg_newwithmessage_44bd88323b6a88cf = function() { return handleError(function (arg0, arg1) {
        const ret = new DOMException(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_objectStoreNames_8c06c40d2b05141c = function() { return logError(function (arg0) {
        const ret = getObject(arg0).objectStoreNames;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setonversionchange_840d65cd0888dfb0 = function() { return logError(function (arg0, arg1) {
        getObject(arg0).onversionchange = getObject(arg1);
    }, arguments) };
    imports.wbg.__wbg_createObjectStore_d3e2789c13dde1fc = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).createObjectStore(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_transaction_cce96cbebd81fe1c = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).transaction(getStringFromWasm0(arg1, arg2), takeObject(arg3));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_Response_eaa426220848a39e = function() { return logError(function (arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Response;
        } catch {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_url_74285ddf2747cb3d = function() { return logError(function (arg0, arg1) {
        const ret = getObject(arg1).url;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments) };
    imports.wbg.__wbg_status_c4ef3dd591e63435 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).status;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_headers_fd64ad685cf22e5d = function() { return logError(function (arg0) {
        const ret = getObject(arg0).headers;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_arrayBuffer_4c27b6f00c530232 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_text_1169d752cc697903 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).text();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_delete_8abedd1043b4105d = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).delete(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_get_6285bf458a1ee758 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).get(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_put_84e7fc93eee27b28 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).put(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_item_52a6bec36314687b = function() { return logError(function (arg0, arg1, arg2) {
        const ret = getObject(arg1).item(arg2 >>> 0);
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    }, arguments) };
    imports.wbg.__wbg_new_2d0053ee81e4dd2a = function() { return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_append_de37df908812970d = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_setonblocked_e66d6be5c879980d = function() { return logError(function (arg0, arg1) {
        getObject(arg0).onblocked = getObject(arg1);
    }, arguments) };
    imports.wbg.__wbg_setonupgradeneeded_17d0b9530f1e0cac = function() { return logError(function (arg0, arg1) {
        getObject(arg0).onupgradeneeded = getObject(arg1);
    }, arguments) };
    imports.wbg.__wbg_newwithstrandinit_05d7180788420c40 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_get_57245cc7d7c7619d = function() { return logError(function (arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_length_6e3bbe7c8bd4dbd8 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_1d9a920c6bfc44a8 = function() { return logError(function () {
        const ret = new Array();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbg_newnoargs_b5b063fc6c2f0376 = function() { return logError(function (arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_268f7b7dd3430798 = function() { return logError(function () {
        const ret = new Map();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_next_579e583d33566a86 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_next_aaef7c8aa5e212ac = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_1b73b0672e15f234 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).done;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_value_1ccc36bc03462d71 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_iterator_6f9d4f28845f426c = function() { return logError(function () {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_get_765201544a2b6869 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_97ae9d8645dc388b = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_0b9bfdd97583284e = function() { return logError(function () {
        const ret = new Object();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_self_6d479506f72c6a71 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_f2557cc78490aceb = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_7f206bda628d5286 = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_ba75c50d1cf384f4 = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_set_a68214f35c417fa9 = function() { return logError(function (arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    }, arguments) };
    imports.wbg.__wbg_isArray_27c46c67f498e15d = function() { return logError(function (arg0) {
        const ret = Array.isArray(getObject(arg0));
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e5e48f4762c5610b = function() { return logError(function (arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof ArrayBuffer;
        } catch {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_168da88779e35f61 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_3999bee59e9f7719 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_set_933729cf5b66ac11 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_isSafeInteger_dfa0593e8d7ac35a = function() { return logError(function (arg0) {
        const ret = Number.isSafeInteger(getObject(arg0));
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_now_58886682b7e790d7 = function() { return logError(function () {
        const ret = Date.now();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_entries_65a76a413fc91037 = function() { return logError(function (arg0) {
        const ret = Object.entries(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_9962f939219f1820 = function() { return logError(function (arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_290(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_resolve_99fe17964f31ffc0 = function() { return logError(function (arg0) {
        const ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_then_11f7a54d67b4bfad = function() { return logError(function (arg0, arg1) {
        const ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_then_cedad20fbbd9418a = function() { return logError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_buffer_3f3d764d4747d564 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_d9aa266703cb98be = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_8c3f0052272a457a = function() { return logError(function (arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_set_83db9690f9353e79 = function() { return logError(function (arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_length_9e1ae1900cb0fbd5 = function() { return logError(function (arg0) {
        const ret = getObject(arg0).length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Uint8Array_971eeda69eb75003 = function() { return logError(function (arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Uint8Array;
        } catch {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_f5933855e4f48a19 = function() { return logError(function (arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_subarray_58ad4efbb5bcb886 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_has_8359f114ce042f5a = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_bf3f89b92d5a34bf = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stringify_d6471d300ded9b68 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper2629 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 670, __wbg_adapter_40);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper30790 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 3544, __wbg_adapter_43);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper30792 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 3544, __wbg_adapter_46);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_closure_wrapper30939 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 3600, __wbg_adapter_49);
        return addHeapObject(ret);
    }, arguments) };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedFloat64Memory0 = new Float64Array();
    cachedInt32Memory0 = new Int32Array();
    cachedUint8Memory0 = new Uint8Array();


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        let src;
        if (typeof document === 'undefined') {
            src = location.href;
        } else {
            src = document.currentScript.src;
        }
        input = src.replace(/\.js$/, '_bg.wasm');
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

wasm_bindgen = Object.assign(init, { initSync }, __exports);

})();
